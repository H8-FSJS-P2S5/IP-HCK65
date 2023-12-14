import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import CardReccomendationTracks from './components/Card/CardReccomendationTracks'
import CardReccomendationArtists from './components/Card/CardReccomendationArtists'
import { router } from './router'

// console.log(code);
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/reccommend/by-tracks' element={<CardReccomendationTracks />}/>
        <Route path='/reccommend/by-artists' element={<CardReccomendationArtists />}/>
      </Routes>
    </Router>
  )
}

export default App
