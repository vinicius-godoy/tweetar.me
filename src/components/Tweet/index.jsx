import { useState, useEffect } from 'react'
import { HeartIcon as NotLiked, BookmarkIcon as NotBookmarked } from '@heroicons/react/outline'
import { HeartIcon as Liked, BookmarkIcon as Bookmarked, TrashIcon } from '@heroicons/react/solid'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

import { useAuth } from '../../hooks/useAuth'

import { avatarPhoto } from '../../constants'

export const Tweet = ({ data, children, updateTimeline }) => {

  const [tweet, setTweet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const { user } = useAuth()

  const fetchTweet = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/tweets?id=${tweet.id}`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
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
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setLiked(false)
    } else {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${tweet.id}`,
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setLiked(true)
    }
    fetchTweet()
  }

  const bookmarkTweet = async (event) => {
    event.preventDefault()

    if (bookmarked) {
      const res = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/bookmarks?tweetId=${tweet.id}`,
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setBookmarked(false)
    } else {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/bookmarks?tweetId=${tweet.id}`,
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setBookmarked(true)
    }
    fetchTweet()
    updateTimeline()
  }

  const fetchLiked = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${tweet.id}`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })

    if (res.status === 200) setLiked(true)
  }

  const fetchBookmarked = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/bookmarks?tweetId=${tweet.id}`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })

    if (res.status === 200) setBookmarked(true)
  }

  const deleteTweet = async (event) => {
    event.preventDefault()

    const res = await axios({
      method: 'delete',
      url: `${import.meta.env.VITE_API_HOST}/tweets?id=${tweet.id}`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
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
    fetchBookmarked()
    setLoading(false)
  }, [tweet])

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div className="flex space-x-3 p-4 border-b border-silver">
          <div>
            <img className="w-12" src={avatarPhoto[tweet.user.avatar]} />
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

          <div className="flex flex-col justify-start items-center space-y-2 !ml-auto">
            <button className="hover:-translate-y-1" onClick={bookmarkTweet}>
              {bookmarked
                ? <Bookmarked className="w-8" />
                : <NotBookmarked className="w-8" />}
            </button>
            {tweet.user.username === user.username && (
              <button className="hover:translate-y-1" onClick={deleteTweet}>
                <TrashIcon className="w-8" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
