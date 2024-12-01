import './App.css'
import { Routes, Route } from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './component/Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './component/UserContext'
import AccountPage from './pages/AccountPage'

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  return ( 
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account/:subpage?' element={<AccountPage />} />
            <Route path='/account/:subpage/:action' element={<AccountPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App

