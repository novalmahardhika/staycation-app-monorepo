import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import MainLayout from './components/layout/main-layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
