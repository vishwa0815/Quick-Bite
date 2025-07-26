import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InfoCard from './components/InfoCard'
import ServicesSection from './pages/Services'
import PlacedOrder from './components/PlacedOrder'
import Signin from './pages/Signin'
import Register from './pages/Register'
import Contact from './pages/Contact'
import GetStarted from './pages/GetStarted'
import Animate from './pages/animate'
const App = () => {
  return (
    <Routes>

      <Route path ='/' element={<GetStarted/>}/>
      <Route path ='/signin' element={<Signin/>}/>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/contact' element={<Contact/>}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/food/:id" element={ <InfoCard/> } />
      <Route path="/order-success" element={<PlacedOrder />} />
      <Route path="/services" element={<ServicesSection/> } />
      <Route path='/animate' element = {<Animate/>}/>
    </Routes>
  )
}

export default App