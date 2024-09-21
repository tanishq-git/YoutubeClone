import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Video from './pages/Video/Video'
import Home from './pages/Home/Home'

const App = () => {
  const [sidebar,setSidebar] = useState(true);
  return (
    <>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoid' element={<Video/>}/>
      </Routes>
    </>
  )
}

export default App

