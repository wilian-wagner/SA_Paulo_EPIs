import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Funcionarios from './pages/Funcionario.jsx'
import EditarFuncionario from './pages/EditarFuncionario.jsx'
import Epi from './pages/EPI.jsx'
import EditarEPIs from './pages/EditarEPIs.jsx'

const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/funcionarios', element: <Funcionarios /> },
  { path: '/funcionarios/editar/:id', element: <EditarFuncionario/>},
  { path: '/Epi', element: <Epi /> },
  { path: '/Epi/editar/:id', element: <EditarEPIs /> }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas} />
)