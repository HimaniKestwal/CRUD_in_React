import React, { FC } from 'react';
import UserList from './components/UserList';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Button } from '@mui/material';
import './App.css'

const App: FC = () => {
  return (
    <div className='App'>
      <>
        <BrowserRouter>
          <AppBar position='static' sx={{ width: '50%', backgroundColor: '#65845f', marginLeft: '30%' }}>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/userlist'>Userlist</Link>
              </li>
            </ul>
          </AppBar>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/userlist' element={<UserList />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
};

export default App;
