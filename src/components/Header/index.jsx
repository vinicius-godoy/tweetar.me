import { useAuth } from '../../hooks/useAuth'

import { avatarPhoto } from '../../constants'

export const Header = ({ title }) => {
  const { user } = useAuth()

  return (
    <header className="flex justify-center items-center p-6 border-b border-silver">
      <div className="flex gap-4">
        <div className="flex justify-center items-center">
          <img className="w-16" src={avatarPhoto[user.avatar]} alt="" />
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-2xl">{user.name}</div>
          <div className="text-silver text-xl">{title}</div>
        </div>
      </div>
    </header>
  )
}
