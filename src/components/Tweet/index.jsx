import { HeartIcon } from '@heroicons/react/outline'

import AvatarBlue from '../../assets/images/avatar-blue.png'

export const Tweet = ({ name, username, avatar, likes, children }) => {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={AvatarBlue} />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{' '}
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>

        <div className="flex space-x-1 text-silver items-center">
          <HeartIcon className="w-6 stroke-1" />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  )
}
