import { useState, useEffect } from 'react'
import { HeartIcon as NotLiked } from '@heroicons/react/outline'
import { HeartIcon as Liked, TrashIcon } from '@heroicons/react/solid'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

import AvatarBlue from '../../assets/images/avatar-blue.png'

export const Tweet = ({ data, children, loggedInUser, updateTimeline }) => {

  const [tweet, setTweet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  const fetchTweet = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/tweets?id=${tweet.id}`,
      headers: {
        authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })

    setTweet(res.data)
  }

  const likeTweet = async (event) => {
    event.preventDefault()

    if (liked) {
      const res = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${tweet.id}`,
        headers: {
          authorization: `Bearer ${loggedInUser.accessToken}`
        }
      })
      if (res.status === 200) setLiked(false)
    } else {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${tweet.id}`,
        headers: {
          authorization: `Bearer ${loggedInUser.accessToken}`
        }
      })
      if (res.status === 200) setLiked(true)
    }
    fetchTweet()
  }

  const fetchLiked = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${tweet.id}`,
      headers: {
        authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
  }

  const deleteTweet = async (event) => {
    event.preventDefault()

    const res = await axios({
      method: 'delete',
      url: `${import.meta.env.VITE_API_HOST}/tweets?id=${tweet.id}`,
      headers: {
        authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })

    if (res.status === 200) updateTimeline()
  }

  useEffect(() => {
    setTweet(data)
  }, [])

  useEffect(() => {
    if (!tweet) return

    fetchLiked()
    setLoading(false)
  }, [tweet])

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div className="flex space-x-3 p-4 border-b border-silver">
          <div>
            <img src={AvatarBlue} />
          </div>

          <div className="space-y-1">
            <span className="font-bold">{tweet.user.name}</span>{' '}
            <span>@{tweet.user.username} </span>
            <span className="text-sm text-silver">
              • {formatDistanceToNow(new Date(tweet.created_at), { locale: ptBR })}
            </span>

            <p>{children}</p>

            <div className="flex space-x-1 text-silver items-center">
              <button onClick={likeTweet}>
                {liked
                  ? <Liked className="transition ease-in-out delay-0 hover:scale-75 duration-75 w-6 stroke-1 fill-red-600" />
                  : <NotLiked className="transition ease-linear delay-0 hover:scale-110 duration-75 w-6 stroke-1" />}
              </button>
              <span>{tweet.likes.length}</span>
            </div>
          </div>

          {tweet.user.username === loggedInUser.username && (
            <div>
              <button onClick={deleteTweet}>
                <TrashIcon className="w-4 mt-1" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
