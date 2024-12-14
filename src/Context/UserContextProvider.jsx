import  React,{ createContext, useState } from 'react'

export const userContextProvider=createContext()

export default function UserContextProvider( {children}) {
const [token, settoken] = useState(localStorage.getItem("token"))
//I Mdae token for user if he has token he can see all page if not he will sing in first 
  return (
   <userContextProvider.Provider value={{token, settoken}}>
    {children}
   </userContextProvider.Provider>
  )
}
