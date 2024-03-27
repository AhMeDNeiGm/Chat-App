import Avatar from 'boring-avatars'
import { useChatsContext } from '../../contexts/chatsContext'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function ChatContact() {
  const { selectedChat, onlineUsers, handelSelectChat } = useChatsContext()
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  const isOnline =
    selectedChat && selectedChat._id && onlineUsers?.includes(selectedChat._id)

  const formatLastSeen = () => {
    if (isOnline) {
      return 'Online'
    } else if (selectedChat?.user.lastSeen) {
      return moment(selectedChat.user.lastSeen).fromNow()
    } else {
      return ''
    }
  }

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
    <>
      {selectedChat && (
        <div className="flex items-center justify-between p-4 bg-dark rounded-3xl">
          <div className="flex items-center gap-6">
            {isSmallScreen && (
              <div
                onClick={() => handelSelectChat('')}
                className=" cursor-pointer hover:text-secondary p-2 ml-2 text-lg"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            )}

            <Avatar
              size={45}
              name={selectedChat.user.username}
              variant="beam"
              colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
            />
            <p>{selectedChat.user.username}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className={`${isOnline ? ' ' : ' text-lightgray'} text-sm`}>
              {formatLastSeen()}
            </p>
            <div
              className={`h-3 w-3 rounded-full mr-3 ${
                isOnline ? ' bg-green-500 ' : ' bg-lightgray'
              } `}
            ></div>
          </div>
        </div>
      )}
    </>
  )
}
