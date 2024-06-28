import './App.css'
import NavBar from "./components/NavBar";
import { BrowserRouter, Outlet, Routes,Route } from "react-router-dom";
import EventPage from './page/EventPage/EventPage';
import ProductPage from './page/ProductPage/ProductPage';
import HomePage from './page/HomePage';
import Attendance from './components/Attendance';
import Roulette from './components/Roulette';
import Point from './components/Point';


const Layout = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}> 
          <Route index element={<HomePage/>}/>
          <Route path='point' element={<Point/>}/>
          <Route path='product' element={<ProductPage/>}/>
          <Route path='attendance' element={<Attendance/>}/>
          <Route path='roulette' element={<Roulette/>}/>
          {/* <Route path='*' element={<NotFoundPage/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
