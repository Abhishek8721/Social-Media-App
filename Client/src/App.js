import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import Home from './Components/Home'
import Createpost from './Components/Createpost';
import {reducer,initialState} from './reducer/userReducer'
import './App.css'
export const UserContext = createContext()
const Routing = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }else{
      navigate('/login')
    }
  },[])
  return(
    <>
    <Routes>
     <Route exact path='/' element={<Home />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     <Route path='/profile' element={<Profile />} />
     <Route path='/create' element={<Createpost />} />
     </Routes>
   </>
  )
 
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
      </UserContext.Provider>

    </>
  );
}

export default App;
