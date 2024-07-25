import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Blogs } from './pages/blogs'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Blog } from './pages/SingleBlog'
import { Publish } from './components/Publish'
import { LandingPage } from './pages/LandingPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/blogs' element = {<Blogs />} />
      <Route path='/Login' element = {<Login />} />
      <Route path='/Signup' element = {<Signup />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path='publish' element={<Publish />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App