import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {//this function must return a component

    
 if(localStorage.getItem('user Token')){
   return props.children
 }else{
   return <Navigate to={'/login'}/>
 }
}
