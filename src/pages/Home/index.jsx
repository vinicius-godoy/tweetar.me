import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { TweetForm } from "../../components/TweetForm"
import { Tweet } from "../../components/Tweet"

export const Home = ({ loggedInUser }) => {
  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        'authorization': `Bearer ${loggedInUser?.accessToken}`,
      }
    })

    setData(res.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={fetchData} />

      <div>
        {data.length && data?.map((tweet) => (
          <Tweet
            key={tweet.id} likes={tweet.likes.length}
            name={tweet.user.name} username={tweet.user.username}
          >
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </>
  )
}