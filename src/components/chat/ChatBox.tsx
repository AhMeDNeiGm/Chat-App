import { useEffect, useState } from 'react'
import { useChatsContext } from '../../contexts/chatsContext'
import ChatContact from './ChatContact'
import { ChatInput } from './ChatInput'
import ChatMessages from './ChatMessages'

export default function ChatBox(): JSX.Element {
  const { selectedChat } = useChatsContext()
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  const chatBoxClasses =
    isSmallScreen && selectedChat
      ? 'absolute overflow-hidden flex flex-col gap-4 p-0 h-full w-[100%]  duration-300 left-0 z-100'
      : isSmallScreen && !selectedChat
      ? 'absolute overflow-hidden flex flex-col gap-4 p-4 h-full w-full  duration-300 left-[100%] z-100'
      : 'relative overflow-hidden flex flex-col gap-4 p-4 h-full w-full  duration-300'

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true)
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={chatBoxClasses}>
      {selectedChat ? (
        <div className="relative flex flex-col  gap-4 h-full w-full p-4 rounded-2xl bg-darker overflow-y-hidden">
          <ChatContact />
          <ChatMessages />
          <ChatInput reciverId={selectedChat._id} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-[95%]">
          <img
            src="src/assets/empty1.svg"
            alt="empty state image"
            className=" w-64 opacity-80"
          />
          <p className="text-light pr-6">Select a covo to start chatting</p>
        </div>
      )}
    </div>
  )
}
