import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Loginnn from './pages/Login'

const code = new URLSearchParams(window.location.search).get('code')
// console.log(code);
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/loginnn' element={<Loginnn />}/>
      </Routes>
    </Router>
  )
}

export default App
