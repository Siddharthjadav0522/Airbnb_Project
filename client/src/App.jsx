import './App.css'
import { Routes, Route } from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './component/Layout'
import Register from './pages/Register'
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1.4000";
axios.defaults.withCredentials = true;

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

