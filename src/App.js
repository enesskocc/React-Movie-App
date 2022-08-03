import React from 'react'
import AuthContextProvider from './context/AuthContext';

import "bootstrap/dist/css/bootstrap.min.css"


import AppRouter from './router/AppRouter';
import { useState } from 'react';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';



// const currentUser = useContext(AuthContext)




const App = () => {

  

  return(
   <div>
   <AuthContextProvider>
  <AppRouter/>
  <ToastContainer/>
  </AuthContextProvider>
  </div>
  )
}

export default App           