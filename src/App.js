import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './App.css';
import Footer from './component/Footer';
import Room from './pages/Room';
import Home from './pages/Home';
import Conference from './pages/Conference';
import CreateConference from './pages/CreateConference';
import TelephoneDirectory from './pages/TelephoneDirectory';
import SettingContainer from './pages/SettingsWorkSpace';
import NavBar from './component/NavBar.js';
import Advertisement from './pages/Advertisement'
import axios from 'axios';

function App() {

  const [image,setImage] = useState();

  useEffect(() => {
    axios.post(`http://localhost:3001/bgStile?login=${localStorage.login}`)
    .then((resp) => {
      switch(resp.data){
        
        case '1':
          setImage('url(http://localhost:3000/static/media/bg8.e101b5cee75f58be9ce0.jpg)');
          break;
        case '2':
          setImage('url(http://localhost:3000/static/media/bg5.ef084f0ec1c986392f3b.jpg)');
          break;
        case '3':
          setImage('url(http://localhost:3000/static/media/bg4.54d627ba3ddbe6543b42.jpg)');
          break;
        case '4':
          setImage('url(http://localhost:3000/static/media/bg1.1538d3aaf21657bcec77.jpg)');
          break;
      };
      
    }).catch((e) => {
      alert(e.message)
    });
  }, [setImage]);
  return (
    <div style={{backgroundImage: image}} className='mainContainer'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:id' element={<Room />} />
        <Route path='/createConference' element={<CreateConference />} />
        <Route path='/conference' element={<Conference />} />
        <Route path='/telephoneDirectory' element={<TelephoneDirectory />} />
        <Route path='/settingContainer' element={<SettingContainer />} />
        <Route path='/advertisement' element={<Advertisement />} />
      </Routes>
    </div>
  );
}

export default App;
