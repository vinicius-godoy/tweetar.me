import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'

const MAX_TWEET_CHAR = 140

export const Tweet = ({ name, username, avatar, likes, children }) => {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar}/>
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

export const TweetForm = () => {

  const [text, setText] = useState('')

  return (
    <div className="border-b border-silver p-4 space-y-8">
      <div className="flex space-x-7">
        <img src="/src/avatar.png" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-14 text-lg flex flex-col">
        <textarea
          name="tweet"
          value={text}
          className="bg-transparent outline-none disabled:opacity-50"
          placeholder="O que está acontencendo?"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}

export const App = () => {
  return (
    <>
      <TweetForm />
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