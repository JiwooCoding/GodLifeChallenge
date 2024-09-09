import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider = () => {
  return (
    <ToastContainer
    autoClose={2000}
    position="top-right"
    closeOnClick
    pauseOnHover
    theme="light"
    />
  )
}

export default ToastProvider