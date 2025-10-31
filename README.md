# Pokédex - Vite + React + TypeScript

Proyecto reconstruido desde cero inspirado en `davidhckh/pokedex`, usando:

- React + React Router v6+
- React Query (TanStack Query)
- Axios (con interceptores)
- Tailwind CSS
- ESLint + Prettier + EditorConfig
- Vitest + Testing Library
- Husky + lint-staged

## Requisitos

- Node.js 18+
- pnpm (recomendado) o npm/yarn

## Instalación

```bash
pnpm install
```

Crear un archivo `.env` en la raíz con:

```bash
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

## Scripts

- `pnpm dev`: modo desarrollo
- `pnpm build`: build de producción
- `pnpm preview`: previsualizar build
- `pnpm lint`: ejecutar ESLint
- `pnpm format`: formatear con Prettier
- `pnpm test`: ejecutar tests
- `pnpm test:watch`: tests en watch

## Husky / Pre-commit

Inicializa git y activa husky:

```bash
git init
pnpm prepare
```

Esto habilita el hook `pre-commit` para ejecutar `lint-staged`.

## Arquitectura

```
src/
  app/
    router.tsx
    providers/ReactQueryProvider.tsx
  pages/
    Home/
      HomePage.tsx
      components/
        SearchBar.tsx
        PokemonGrid.tsx
        PokemonCard.tsx
    PokemonDetail/
      PokemonDetailPage.tsx
    Favorites/
      FavoritesPage.tsx
  components/
    ui/ (Button, Card, Badge, Loader, ErrorState, EmptyState)
    layout/ (Header, Footer, Container)
  hooks/
    queries/ (usePokemonsQuery.ts, usePokemonQuery.ts)
    useLocalStorage.ts
  services/
    http.ts
    pokemon.service.ts
  adapters/
    pokemon.adapter.ts
  models/
    pokemon.ts
  utils/
    formatters.ts
  styles/
    index.css (Tailwind)
  config/
    env.ts
  tests/
    adapters/, components/, hooks/
```

## Decisiones técnicas

- React Query maneja cache, `staleTime` y estados de carga/error.
- Axios configurado con `baseURL` desde `VITE_API_BASE_URL`. Interceptor de errores normaliza `{ status, message }`.
- Tailwind CSS para todos los estilos. Sin CSS frameworks extra.
- Búsqueda por nombre consume detalle directo. El listado usa `useInfiniteQuery` con `offset`/`limit` y cada `PokemonCard` carga sus datos con `usePokemonQuery` (prefetch opcional vía `usePrefetchPokemon`).
- Favoritos persistidos en `localStorage` con `useLocalStorage`.

## Criterios de aceptación

- Buscar por nombre desde `/` y ver el resultado.
- Listado infinito con estados de carga y error.
- Detalle en `/pokemon/:name` con sprites, tipos y stats.
- Favoritos en `/favorites` con persistencia.
- Base URL configurable por `.env`.

## Comandos esperados

```bash
pnpm create vite@latest Pokedex --template react-ts
pnpm add react-router-dom @tanstack/react-query axios
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
pnpm add -D husky lint-staged
```

