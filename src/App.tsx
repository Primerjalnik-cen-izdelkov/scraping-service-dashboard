import './App.scss';

import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import Home from "./pages/Home";
import Bots from './pages/Bots';
import Files from './pages/Files';
import Logs from './pages/Logs';
import Login from './components/Login';
import useToken from './useToken';

function App() {
  const {token, setToken} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  console.log("ROUTING");

  return (
    // TODO(miha): Switch colormode of the dashboard here
    <div className={""}>
      <BrowserRouter basename='/dashboard'>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="bots">
              <Route index element={<Bots />} />
            </Route>
            <Route path="logs">
              <Route index element={<Logs />} />
            </Route>
            <Route path="files">
              <Route index element={<Files />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App