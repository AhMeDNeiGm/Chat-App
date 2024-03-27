import User from '../Modals/UserModal'

export default interface GetChatsDTO {
  status: string
  users: User[]
}
