import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { Container } from '../components/layout/Container.tsx'
import { HomePage } from '../pages/Home/HomePage.tsx'
import { PokemonDetailPage } from '../pages/PokemonDetail/PokemonDetailPage.tsx'
import { FavoritesPage } from '../pages/Favorites/FavoritesPage.tsx'
import { LegendaryPage } from '../pages/Legendary/LegendaryPage'

function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold">404 - Página no encontrada</h1>
      <p className="text-gray-600 mt-2">
        La ruta solicitada no existe. Vuelve al inicio.
      </p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pokemon/:name', element: <PokemonDetailPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'legendaries', element: <LegendaryPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])


