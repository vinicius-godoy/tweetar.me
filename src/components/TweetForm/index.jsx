import { useState } from 'react'

import { MAX_TWEET_CHAR } from '../../constants/index'

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