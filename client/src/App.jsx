import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Home from './components/Home/Home'

const code = new URLSearchParams(window.location.search).get('code')
// console.log(code);
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
