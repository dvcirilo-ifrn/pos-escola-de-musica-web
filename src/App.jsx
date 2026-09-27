import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import { Layout } from './components/Layout'
import { Publica } from './components/Publica'
import { Cadastro } from './pages/Cadastro'
import { Entrada } from './pages/Entrada'
import { EsqueciSenha } from './pages/EsqueciSenha'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { Perfil } from './pages/Perfil'

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
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
