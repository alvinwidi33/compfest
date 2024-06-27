
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import HubungiKami from './pages/hubungi-kami';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/hubungi-kami" element={<HubungiKami/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
