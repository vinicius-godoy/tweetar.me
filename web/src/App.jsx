import { HeartIcon } from '@heroicons/react/outline'

export const Tweet = ({ name, username, avatar, likes, children }) => {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar}/>
      </div>
      <div className='space-y-1'>
        <span className="font-bold text-sm">{name}</span>{' '}
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>

        <div className='flex space-x-1 text-silver items-center'>
          <HeartIcon className='w-6 stroke-1'/>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  )
}

export const App = () => {
  return (
    <>
      <Tweet
        name="Elon Musk" username="elonmusk"
        avatar="/src/avatar.png" likes="1.2M"
      >
        Let's manipulate crypto!
      </Tweet>
      <Tweet
        name="Vinícius Godoy" username="vinicius-godoy"
        avatar="/src/avatar.png" likes="6"
      >
        Let's study ReactJS!
      </Tweet>
    </>
  )
}