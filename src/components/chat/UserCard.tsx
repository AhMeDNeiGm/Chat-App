import Avatar from 'boring-avatars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { resetAxiosConfig } from '../../utilities/axios.config'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function UserCard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    resetAxiosConfig()
    navigate('/')
  }

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])

  return (
    <div className="flex justify-between items-center p-6 w-full rounded-2xl bg-dark">
      <div className="flex gap-4">
        {username && (
          <Avatar
            size={45}
            name={username}
            variant="beam"
            colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
          />
        )}
        <div>
          <p className="mb-1">{username}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
            <p className="text-lightgray text-sm">online</p>
          </div>
        </div>
      </div>
      <div
        onClick={logout}
        className=" cursor-pointer h-9 w-9 rounded-full flex justify-center items-center bg-gray duration-300 hover:bg-primary "
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm " />
      </div>
    </div>
  )
}
