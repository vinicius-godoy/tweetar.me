import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { Header } from "../../components/Header"
import { Tweet } from '../../components/Tweet'
import { useAuth } from '../../hooks/useAuth'

export const Bookmarks = () => {
  const [data, setData] = useState([])
  const { user } = useAuth()

  const fetchData = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/bookmarks`,
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
      <Header title="Itens Salvos" />

      <div>
        {data?.map((bookmark) => (
          <Tweet
            key={bookmark.tweet.id}
            data={bookmark.tweet}
            updateTimeline={fetchData}
          >
            {bookmark.tweet.text}
          </Tweet>
        ))}
      </div>
    </main>
  )
}
