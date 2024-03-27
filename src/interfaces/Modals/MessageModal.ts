export default interface Message {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: Date
  updatedAt: Date
  status?: 'pending' | 'sent' | 'read' | 'failed'
  __v: number
}
