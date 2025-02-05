import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import MainLayout from './components/layout/main-layout'
import AuthLayout from './components/layout/auth-layout'
import SignInPage from './pages/auth/sign-in'
import SignUpPage from './pages/auth/sign-up'
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Homepage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='signIn' element={<SignInPage />} />
            <Route path='signUp' element={<SignUpPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
