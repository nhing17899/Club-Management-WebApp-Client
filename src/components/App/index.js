import React from "react";
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from '../HomePage/index';
import PeoplePage from '../People/index';
import AddMemberModal from "../People/addMember";
import Login from '../Account/Login/index';
import SignUp from '../Account/SignUp/index';
import EventPage from '../Events/index';
import AddEventModal from "../Events/addEvent";

import './index.css';

import * as ROUTES from '../../constants/routes';


function App() {
  return (
      <Router>

      <div className='App'>
        <nav className='navbar navbar-expand navbar-light fixed-top'>
          <div className='containerNav'>
            <Link className='navbar-brand' to={'/'}>Home</Link>
            <div className='collapse navbar-collapse containernavItem'>
              <ul className='navbar-nav ml-auto navItem'>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/login"}>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/signup"}>SignUp</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/people"}>Member List</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/add-member"}>Add Member</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/event"}>Events</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={"/add-event"}>Add Event</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path='/' element={<HomePage/>}/>
              <Route exact path={ROUTES.LOGIN} element={<Login/>}/>
              <Route exact path={ROUTES.SIGNUP} element={<SignUp/>}/>
              <Route exact path={ROUTES.PEOPLE} element={<PeoplePage/>}/>
              <Route exact path={ROUTES.ADD_MEMBER} element={<AddMemberModal/>}/>
              <Route exact path={ROUTES.EVENT} element={<EventPage/>}/>
              <Route exact path={ROUTES.ADD_EVENT} element={<AddEventModal/>}/>
            </Routes>
          </div>
        </div>

      </div>

    </Router>
  );
}

export default App;
