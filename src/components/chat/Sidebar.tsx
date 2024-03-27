import UserCard from './UserCard'
import ContactCard from './ContactCard'
import { useState } from 'react'
import { useChatsContext } from '../../contexts/chatsContext'
import Chat from '../../interfaces/Modals/ChatModal'
import Spinner from '../shared/Spinner'

export default function Sidebar() {
  const { chats, isFetching } = useChatsContext()
  const [isGlowing, setIsGlowing] = useState<boolean>(true)

  const handelToggleGlowing = () => {
    setIsGlowing((g) => !g)
  }

  return (
    <div className="flex flex-col gap-4 p-4 pr-1 h-full w-full md:w-[540px] overflow-hidden">
      <div className="w-full h-full p-2 rounded-2xl bg-dark overflow-y-hidden">
        <h1
          onClick={handelToggleGlowing}
          className={` ${
            isGlowing ? ' glow ' : ''
          } cursor-pointer text-center p-6 billo text-5xl  text-light rounded-2xl bg-darkest mb-4 `}
        >
          CONVO
        </h1>

        {isFetching ? (
          <div className="flex flex-col gap-3 justify-center items-center h-[80%]">
            <Spinner />
            <p>Loading your convo's</p>
          </div>
        ) : (
          <>
            <p className=" p-2 px-4  bg-gray rounded-xl mb-3 mx-1 mt-1">
              Chats ({chats.length})
            </p>
            <div className="h-[88%] pb-28 overflow-y-scroll custom-scrollbar">
              {chats.map((c: Chat) => {
                return <ContactCard key={c._id} user={c.user} />
              })}
              {chats.length > 0 && (
                <p className=" py-6 text-center text-sm  text-lightgray">
                  Now that's the clique
                </p>
              )}
              {chats.length === 0 && (
                <p className="flex justify-center items-center text-center px-3 h-[60%] text-sm  text-lightgray">
                  How cool would it be to have friends huh?
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <UserCard />
    </div>
  )
}
