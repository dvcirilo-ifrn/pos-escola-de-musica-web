import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Foto } from './Foto'

export function Menu() {
  const { usuario, pode, inicio } = useAuth()
  const organizacao = usuario.organizacao

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={inicio}>
          {organizacao.logo
            ? <Image src={organizacao.logo} height={30} className="me-2" />
            : <i className="bi bi-music-note-beamed me-2"></i>}
          {organizacao.nome}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />
        <Navbar.Collapse id="menu">
          {pode('api.change_organizacao') ? (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/admin/agenda">Agenda</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/confirmar">A confirmar</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/inicio">Início</Nav.Link>
              {pode('api.add_agendamento') && (
                <Nav.Link as={NavLink} to="/agendar">Agendar</Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/aulas">Minhas aulas</Nav.Link>
              <Nav.Link as={NavLink} to="/professores">Professores e salas</Nav.Link>
            </Nav>
          )}
          <Nav>
            <Nav.Link as={NavLink} to="/perfil">
              <Foto src={usuario.foto} tamanho={24} /> {usuario.nome}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
