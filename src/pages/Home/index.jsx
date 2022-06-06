import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { TweetForm } from '../../components/TweetForm'
import { Tweet } from '../../components/Tweet'
import { useAuth } from '../../hooks/useAuth'

export const Home = () => {
  const [data, setData] = useState([])
  const { user } = useAuth()

  const fetchData = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/tweets`,
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      }
    })

    setData(res.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="!mb-auto overflow-y-auto lg:w-4/5 lg:border-x lg:border-silver lg:h-full">
      <TweetForm onSuccess={fetchData} />

      <div>
        {data?.map((tweet) => (
          <Tweet
            key={tweet.id}
            data={tweet}
            updateTimeline={fetchData}
          >
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </main>
  )
}