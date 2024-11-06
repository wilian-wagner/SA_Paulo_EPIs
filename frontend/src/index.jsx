import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
// import Funcionarios from './pages/Funcionario.jsx'
// import EPI from './pages/EPI.jsx'

const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  // { path: '/Funcionarios', element: <Funcionarios /> },
  // { path: '/EPI', element: <EPI /> }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas} />
)