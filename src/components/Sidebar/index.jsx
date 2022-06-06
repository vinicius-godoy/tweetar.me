import {
  HomeIcon as HomeOutline,
  BookmarkIcon as BookmarkOutline,
  UserIcon as UserOutline,
  LogoutIcon
} from '@heroicons/react/outline'
import {
  HomeIcon as HomeSolid,
  BookmarkIcon as BookmarkSolid,
  UserIcon as UserSolid,
} from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/images/codarme-logo.png'

import { avatarPhoto } from '../../constants'

export const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:space-y-6 lg:w-1/5 lg:min-w-fit lg:pr-4">
      <div className="pt-6">
        <img className="w-8" src={Logo} alt="" />
      </div>

      <ul className="space-y-6">
        <li className="hover:-translate-y-1">
          <Link
            to="/"
            className="flex justify-start items-center gap-4 text-lg font-bold"
          >
            {location.pathname === '/' ? (
              <><HomeSolid className="w-8 m-0" /> Página Inicial</>
            ) : (
              <><HomeOutline className="w-8 m-0" /> Página Inicial</>
            )}
          </Link>
        </li>
        <li className="hover:-translate-y-1">
          <Link
            to="/bookmarks"
            className="flex justify-start items-center gap-4 text-lg font-bold"
          >
            {location.pathname === '/bookmarks' ? (
              <><BookmarkSolid className="w-8 m-0" /> Itens Salvos</>
            ) : (
              <><BookmarkOutline className="w-8 m-0" /> Itens Salvos</>
            )}
          </Link>
        </li>
        <li className="hover:-translate-y-1">
          <Link
            to="/profile"
            className="flex justify-start items-center gap-4 text-lg font-bold"
          >
            {location.pathname === '/profile' ? (
              <><UserSolid className="w-8 m-0" /> Perfil</>
            ) : (
              <><UserOutline className="w-8 m-0" /> Perfil</>
            )}
          </Link>
        </li>
        <li className="hover:translate-y-1">
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
            <img className="w-12" src={avatarPhoto[user.avatar]} alt="" />
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
  )
}
