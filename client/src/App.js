import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Auth from './pages/Auth/Auth';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home/Home';
import NewGame from './pages/NewGame/NewGame';
import Game from './pages/Game/Game';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.AuthReducer.authData);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
          <Route path="/auth" element={user ? <Navigate to="/home" /> : <Auth />} />
          <Route path="/auth/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/auth/register" element={user ? <Navigate to="/home" /> : <Register />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/new-game" element={user ? <NewGame /> : <Navigate to="/auth" />} />
          <Route path="/game/:gameId" element={user ? <Game /> : <Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
