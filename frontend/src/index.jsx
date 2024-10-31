import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'

const paginas = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Funcionarios', element: <Detalhes /> }
  ])