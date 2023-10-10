
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from '../../screens/Home/Home'
import Login from '../../screens/Login/Login'
import SignUp from '../../screens/SignUp/SignUp'
import Institute from '../../screens/Institute/Institute'
import Admin from '../../screens/Admin/Admin'
import User from '../../screens/User/User'
import Protected from '../../screens/Protected'
import Registration from '../../screens/Registration/Registration'
import Result from '../../screens/Result/Result'

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Protected Screen={Admin} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin/*" element={<Protected Screen={Admin} />} />
          <Route path="/user/*" element={<Protected Screen={User} />} />
          <Route path="/institute/*" element={<Protected Screen={Institute} />} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter