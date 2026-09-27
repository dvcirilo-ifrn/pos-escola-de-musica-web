import { Container } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Carregando } from './Carregando'
import { Menu } from './Menu'

export function Layout() {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return <Carregando />
  }
  if (!usuario) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Menu />
      <Container className="my-4">
        <Outlet />
      </Container>
    </>
  )
}
