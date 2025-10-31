import { Link, NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="font-semibold text-red-600">
            Pokédex
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-red-600 ${isActive ? 'text-red-600' : 'text-gray-700'}`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `hover:text-red-600 ${isActive ? 'text-red-600' : 'text-gray-700'}`
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/legendaries"
              className={({ isActive }) =>
                `hover:text-red-600 ${isActive ? 'text-red-600' : 'text-gray-700'}`
              }
            >
              Legendarios
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}


