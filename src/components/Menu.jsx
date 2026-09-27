import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Foto } from './Foto'

export function Menu() {
  const { usuario, pode, inicio, sair } = useAuth()
  const organizacao = usuario.organizacao

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={inicio}>
          <Image src="/favicon.png" height={32} className="me-2" />
          {organizacao.nome}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />
        <Navbar.Collapse id="menu">
          {pode('api.change_organizacao') ? (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/admin/agenda">Agenda</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/confirmar">A confirmar</Nav.Link>
              <NavDropdown title="Cadastros">
                <NavDropdown.Item as={Link} to="/admin/negocio">Dados do negócio</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/recursos">Professores e salas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/servicos">Serviços</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} to="/admin/avaliacoes">Avaliações</Nav.Link>
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
            <NavDropdown
              align="end"
              title={<><Foto src={usuario.foto} tamanho={24} /> {usuario.nome}</>}
            >
              <NavDropdown.Item as={Link} to="/perfil">
                <i className="bi bi-person"></i> Meu perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={sair}>
                <i className="bi bi-box-arrow-right"></i> Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
