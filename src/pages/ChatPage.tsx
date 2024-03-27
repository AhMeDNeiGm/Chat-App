import Sidebar from '../components/chat/Sidebar'
import ChatBox from '../components/chat/ChatBox'
import { ChatsProvider } from '../contexts/chatsContext'

export default function ChatPage() {
  return (
    <ChatsProvider>
      <div className="flex w-full h-dvh min-h-[650px] bg-darkest text-light overflow-hidden">
        <Sidebar />
        <ChatBox />
      </div>
    </ChatsProvider>
  )
}
