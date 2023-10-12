import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Forgotten from './pages/Forgotten';
import AccessDenied from './pages/AccessDenied';
import CreateSet from './pages/CreateSet';
import UserAdd from './pages/UserAdd';
import LogoutRoute from './routes/LogoutRoute';
import AuthenRoute from './routes/AuthenRoute';
import AdminRoute from './routes/AuthenRoute';
import Profile from './pages/Profile';
import LearnHistory from './pages/LearnHistory';
import SearchPage from './pages/SearchPage';
import ChangePass from './pages/ChangePass';
import SetEdit from './pages/SetEdit';
import { UserView } from './pages/UserView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgotten" element={<Forgotten/>} />
        <Route path="/profile" element={<AuthenRoute element={<Profile/>}/>}/>
        <Route path="/changepass" element={<AuthenRoute element={<ChangePass/>}/>}/>
        <Route  path="/dashboard" element={<AdminRoute element={<Dashboard/>} />}/>
        <Route path="/users">
            <Route index path="/users/list" element={<AdminRoute element={<UserList/>}/>}/>
            <Route path="/users/add" element={<AdminRoute element={<UserAdd/>} />}/>
            <Route path="/users/:id" element={<AdminRoute element={<UserView/>} />}/>
        </Route>
        <Route path="/search" element={<SearchPage />}/>
        <Route path="/history" element={<AuthenRoute element={<LearnHistory/>}/>}/>
        <Route path="/latest" element={<AuthenRoute element={<NotFound />}/>}/>
        <Route path="/create-set" element={<AuthenRoute element={<CreateSet />}/>}/>
        <Route path="/:setId/edit" element={<AuthenRoute element={<SetEdit />}/>}/>
        <Route path="/my-sets" element={<AuthenRoute element={<NotFound />}/>}/>
        <Route path="/my-folder" element={<AuthenRoute element={<NotFound />}/>}/>
        <Route path="/my-class" element={<AuthenRoute element={<NotFound />}/>}/>
        <Route path='/signout' element={<LogoutRoute/>}/>
        <Route path='/access-denied' element={<AccessDenied/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
