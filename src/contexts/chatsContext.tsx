import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { ax } from '../utilities/axios.config'
import Message from '../interfaces/Modals/MessageModal'
import User from '../interfaces/Modals/UserModal'
import Chat from '../interfaces/Modals/ChatModal'
import io from 'socket.io-client'

interface contextType {
  chats: Chat[]
  selectedChat: Chat | null
  onlineUsers: string[]
  isFetching: boolean
  handelSelectChat: (user_id: string) => void
  sendMessage: (message: string, reciverId: string) => void
}

const ChatsContext = createContext<contextType>({
  chats: [],
  selectedChat: null,
  onlineUsers: [],
  isFetching: false,
  handelSelectChat: () => {},
  sendMessage: () => {}
})
// eslint-disable-next-line react-refresh/only-export-components
export const useChatsContext = () => useContext(ChatsContext)

interface ChatsProviderProps {
  children: ReactNode
}

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const receiveMessage = (msg: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === msg.senderId
          ? { ...chat, messages: [...chat.messages, msg] }
          : chat
      )
    )
    setSelectedChat((prevSelectedChat) => {
      if (!prevSelectedChat || prevSelectedChat._id !== msg.senderId)
        return prevSelectedChat
      return {
        ...prevSelectedChat,
        messages: [...prevSelectedChat.messages, msg]
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const authToken = `Bearer ${token}`
    const socketServerUrl = `https://real-time-chat-app-iti-v2.onrender.com`
    const socket = io(socketServerUrl, {
      extraHeaders: {
        Authorization: authToken
      }
    })
    socket.on('connect', () => {
      console.log('Connected to server')
    })
    socket.on('newMessage', (msg) => {
      receiveMessage(msg)
    })

    socket.on('getOnlineUsers', (data) => {
      setOnlineUsers(data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true)
        const res = await ax.get('/users')
        const currentUsername = localStorage.getItem('username')
        const fetchedCurrentUser = res.data.users.find(
          (u: User) => u.username === currentUsername
        )
        setCurrentUser(fetchedCurrentUser)
        const fetchedUsers = res.data.users.filter(
          (u: User) => u.username !== currentUsername
        )
        const chatsPromises = fetchedUsers.map(async (u: User) => {
          const res = await ax.get<Message[]>(`/message/${u._id}`)
          return {
            _id: u._id,
            user: u,
            messages: res.data
          }
        })
        const allChats = await Promise.all(chatsPromises)
        setChats(allChats)
        setIsFetching(false)
      } catch (err) {
        setIsFetching(false)
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handelSelectChat = (user_id: string | null) => {
    if (user_id == '') {
      setSelectedChat(null)
      return
    }
    const selected = chats.find((c: Chat) => c._id === user_id)
    if (selected) {
      setSelectedChat(selected)
    }
  }

  const sendMessage = async (message: string, receiverId: string) => {
    const sendingTime = Date.now()
    try {
      if (currentUser) {
        const pendingMessage: Message = {
          _id: `${sendingTime}`,
          senderId: currentUser._id,
          receiverId: receiverId,
          message: message,
          createdAt: new Date(sendingTime),
          updatedAt: new Date(sendingTime),
          __v: 0,
          status: 'pending'
        }

        // Update the UI immediately with the pending message
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === receiverId
              ? { ...chat, messages: [...chat.messages, pendingMessage] }
              : chat
          )
        )

        setSelectedChat((prevSelectedChat) => {
          if (!prevSelectedChat || prevSelectedChat._id !== receiverId)
            return prevSelectedChat
          return {
            ...prevSelectedChat,
            messages: [...prevSelectedChat.messages, pendingMessage]
          }
        })
      }

      // Send the message to the server
      const res = await ax.post(`/message/send/${receiverId}`, { message })
      const sentMessage: Message = res.data.message
      sentMessage.status = 'sent'

      // Update the UI with the successfully sent message
      setChats((prevChats) => {
        // Create a new copy of the chats array with the updated message
        const updatedChats = prevChats.map((chat) => {
          if (chat._id === receiverId) {
            return {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg._id === `${sendingTime}` ? sentMessage : msg
              )
            }
          }
          return chat
        })
        return updatedChats
      })
      setSelectedChat((prevSelectedChat) => {
        if (!prevSelectedChat || prevSelectedChat._id !== receiverId) {
          return prevSelectedChat
        }
        // Create a new copy of the selected chat with the updated message
        const updatedSelectedChat = {
          ...prevSelectedChat,
          messages: prevSelectedChat.messages.map((msg) =>
            msg._id === `${sendingTime}` ? sentMessage : msg
          )
        }
        return updatedSelectedChat
      })
    } catch (err) {
      console.log(err)
      // If sending fails, update the status of the pending message to 'failed'
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id == receiverId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg._id === `${sendingTime}`
                    ? { ...msg, status: 'failed' }
                    : msg
                )
              }
            : chat
        )
      )
      setSelectedChat((prevSelectedChat) => {
        if (!prevSelectedChat || prevSelectedChat._id !== receiverId)
          return prevSelectedChat
        return {
          ...prevSelectedChat,
          messages: prevSelectedChat.messages.map((msg) =>
            msg._id === `${sendingTime}` ? { ...msg, status: 'failed' } : msg
          )
        }
      })
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSelectedChat(null)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ChatsContext.Provider
      value={{
        isFetching,
        chats,
        selectedChat,
        onlineUsers,
        handelSelectChat,
        sendMessage
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}
