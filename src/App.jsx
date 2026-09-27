import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import { Layout } from './components/Layout'
import { Publica } from './components/Publica'
import { AConfirmar } from './pages/admin/AConfirmar'
import { Agenda } from './pages/admin/Agenda'
import { Negocio } from './pages/admin/Negocio'
import { Confirmar } from './pages/agendar/Confirmar'
import { EscolherHorario } from './pages/agendar/EscolherHorario'
import { EscolherProfessor } from './pages/agendar/EscolherProfessor'
import { EscolherServico } from './pages/agendar/EscolherServico'
import { Enviado } from './pages/agendar/Enviado'
import { Aula } from './pages/Aula'
import { Avaliar } from './pages/Avaliar'
import { Cadastro } from './pages/Cadastro'
import { Entrada } from './pages/Entrada'
import { EsqueciSenha } from './pages/EsqueciSenha'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { MinhasAulas } from './pages/MinhasAulas'
import { NaoEncontrado } from './pages/NaoEncontrado'
import { Perfil } from './pages/Perfil'
import { Professor } from './pages/Professor'
import { Professores } from './pages/Professores'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Publica />}>
            <Route index element={<Entrada />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/agendar" element={<EscolherServico />} />
            <Route path="/agendar/professor" element={<EscolherProfessor />} />
            <Route path="/agendar/horario" element={<EscolherHorario />} />
            <Route path="/agendar/confirmar" element={<Confirmar />} />
            <Route path="/agendar/enviado" element={<Enviado />} />
            <Route path="/aulas" element={<MinhasAulas />} />
            <Route path="/aulas/:id" element={<Aula />} />
            <Route path="/aulas/:id/avaliar" element={<Avaliar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin/agenda" element={<Agenda />} />
            <Route path="/admin/confirmar" element={<AConfirmar />} />
            <Route path="/admin/negocio" element={<Negocio />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/professores/:id" element={<Professor />} />
            <Route path="*" element={<NaoEncontrado />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
