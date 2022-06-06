import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HomeIcon, BookmarkIcon, UserIcon, LogoutIcon } from '@heroicons/react/outline'

import { TweetForm } from "../../components/TweetForm"
import { Tweet } from "../../components/Tweet"
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../assets/images/codarme-logo.png'
import AvatarBlue from '../../assets/images/avatar-blue.png'

export const Home = () => {
  const [data, setData] = useState([])
  const { user, logout } = useAuth()

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
    <div className="h-full flex flex-col lg:flex-row lg:justify-center lg:px-40">
      <aside className="hidden lg:flex lg:flex-col lg:space-y-6 lg:w-1/5 lg:min-w-fit lg:pr-4">
        <div className="pt-6">
          <img className="w-8" src={Logo} alt="" />
        </div>

        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="flex justify-start items-center gap-4 text-lg font-bold"
            >
              <HomeIcon className="w-8 m-0" /> Página Inicial
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-start items-center gap-4 text-lg font-bold"
            >
              <BookmarkIcon className="w-8 m-0" /> Itens Salvos
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-start items-center gap-4 text-lg font-bold"
            >
              <UserIcon className="w-8 m-0" /> Perfil
            </Link>
          </li>
          <li>
            <button
              className="flex justify-start items-center gap-4 text-lg text-birdBlue font-bold"
              onClick={logout}
            >
              <LogoutIcon className="w-8 m-0" /> Sair
            </button>
          </li>
        </ul>

        <div className="!mt-auto space-y-3">
          <div className="flex gap-4">
            <div>
              <img src={AvatarBlue} alt="" />
            </div>

            <div className="flex flex-col">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-silver">@{user.username}</div>
            </div>
          </div>

          <address className="pb-4 text-platinum not-italic">
            <span>Feito por </span>
            <a
              className="text-birdBlue"
              href="https://github.com/vinicius-godoy" target="_blank" rel="noreferrer noopener"
            >
              @vinicius-godoy
            </a>
          </address>
        </div>
      </aside>

      <main className="lg:w-4/5 lg:border-x lg:border-silver">
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
    </div>
  )
}