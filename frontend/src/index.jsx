import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Funcionarios from './pages/Funcionario.jsx'
import EditarFuncionario from './pages/EditarFuncionario.jsx'
// import EPI from './pages/EPI.jsx'

const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/funcionarios', element: <Funcionarios /> },
  { path: '/funcionarios/editar/:id', element: <EditarFuncionario/>}
  // { path: '/EPI', element: <EPI /> }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas} />
)