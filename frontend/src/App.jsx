import React, { useContext, useEffect, useState } from 'react'
import Navbar from './componenets/Navbar'
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom'
import Home from './componenets/Home'
import MyRecipe from './componenets/MyRecipe'
import SignUp from './componenets/SignUp'
import Login from './componenets/Login'
import Fav from './componenets/Fav'
import NotFound from './componenets/NotFound'
import AddRecipe from './componenets/AddRecipe'
import { Context } from './componenets/Context'
import { useNavigate } from 'react-router-dom'
import PrivateRoute from './componenets/PrivateRoute'
import Recipe from './componenets/Recipe'
import UpdateRecipe from './componenets/UpdateRecipe'
import AdminPanel from './componenets/AdminPanel'
import SearchModal from './componenets/SearchModel'

export default function App() {
  const {isSearchOpen,setIsSearchOpen}=useContext(Context)
   
  return (
    <>
     <Navbar/>
     <Routes>
      <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
      <Route path="/myrecipe" element={<PrivateRoute><MyRecipe/></PrivateRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/fav" element={<PrivateRoute><Fav/></PrivateRoute>} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/addrecipe" element={<PrivateRoute><AddRecipe/></PrivateRoute>}/>
      <Route path="/recipe" element={<PrivateRoute><Recipe/></PrivateRoute>} />
      <Route path="/recipe/update" element={<PrivateRoute><UpdateRecipe /></PrivateRoute>} />
      <Route path="/recipe/Admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />

     </Routes>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
   
    </>
   
  )
}
