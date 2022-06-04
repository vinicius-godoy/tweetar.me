import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { TweetForm } from "../../components/TweetForm"
import { Tweet } from "../../components/Tweet"

export const Home = () => {
  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const token = ''
    const res = await axios.get('http://localhost:9901/tweets', {
      headers: {
        'authorization': `Bearer ${token}`,
      }
    })

    setData(res.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <TweetForm />
      <div>
        {data.length && data?.map((tweet) => (
          <Tweet
            name={tweet.user.name} username={tweet.user.username}
            avatar="/src/avatar.png" likes={tweet.likes.length}
          >
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </>
  )
}