import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import AnimatedRoutes from './router';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './css/main.css'
import { DataContextProvider } from './dataContext'

const App = () => {
  return (
    <DataContextProvider>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AnimatedRoutes />
      </Router>
      <ToastContainer />
    </DataContextProvider>
  );
};

export default App;
