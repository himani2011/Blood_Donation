import React from 'react';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

    </div>
  )
}

export default App






// import logo from './logo.svg';
// import './App.css';
// import Home from './components/Home';
// import Admin from './components/Admin';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import {Routes,Route} from 'react-router-dom';
// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <Home/>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/signup" element={<Signup/>} />
//         <Route path="/admin" element={<Admin/>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
