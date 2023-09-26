import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
const NoPage = React.lazy(()=>import( './pages/NotFound'));

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route  path="/users">
          <Route index element={<UserList/>}/>
          <Route path=":id" element={<NoPage/>}/>
          <Route path="add" element={<NoPage/>}/>
        </Route>
        <Route path='*' element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
