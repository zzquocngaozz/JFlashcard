import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import CreateSet from './pages/CreateSet';
import UserAdd from './pages/UserAdd';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/users">
            <Route index path="/users/list" element={<UserList/>}/>
            <Route path="/users/add" element={<UserAdd/>}/>
            <Route path="/users/:id" element={<NotFound/>}/>
        </Route>
        <Route path="/create-sets" element={<CreateSet />}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
