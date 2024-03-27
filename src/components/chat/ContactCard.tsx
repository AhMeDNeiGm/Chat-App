import Avatar from 'boring-avatars'
import User from '../../interfaces/Modals/UserModal'
import { useChatsContext } from '../../contexts/chatsContext'
import moment from 'moment'

interface props {
  user: User
}

export default function ContactCard({ user }: props) {
  const { chats, selectedChat, handelSelectChat, onlineUsers } =
    useChatsContext()
  const isSelected = selectedChat?._id == user._id
  const isOnline = onlineUsers?.includes(user._id)
  const chat = chats.find((c) => c._id === user._id)
  const lastMsg = chat?.messages[chat?.messages.length - 1]

  return (
    <div
      onClick={() => handelSelectChat(user._id)}
      className={`relative flex items-center gap-4 p-4 cursor-pointer rounded-xl duration-300 hover:bg-darker mb-2 ml-1 ${
        isSelected ? ' bg-gray' : ' '
      } `}
    >
      <div className="min-w-fit">
        <Avatar
          size={45}
          name={user.username}
          variant="beam"
          colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
        />
      </div>
      <div className="relative w-full">
        <div className="relative w-full flex justify-between items-center mb-1">
          <div className="mb-1 flex w-full items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isOnline ? 'bg-green-600' : 'bg-lightgray'
              } `}
            ></div>
            <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
              {user.username}
            </p>
          </div>
          <p className="min-w-fit text-sm text-lightgray">
            {lastMsg && moment(lastMsg?.createdAt).format('hh:mm A')}
          </p>
        </div>
        <p className="text-sm text-lightgray text-nowrap overflow-hidden overflow-ellipsis">
          {lastMsg?.message.split(' ')[0] == '&&IMG?LINK'
            ? 'Image'
            : lastMsg?.message}
        </p>
      </div>
    </div>
  )
}
