import Message from './MessageModal'
import User from './UserModal'

export default interface Chat {
  _id: string
  user: User
  messages: Message[]
}
