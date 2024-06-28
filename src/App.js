
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import HubungiKami from './pages/hubungi-kami';
import Register from './pages/register';
import ListSalon from './pages/admin/list-salon';
import ListSalonCustomer from './pages/customer/list-salon-customer';
import ProtectedRoute from './pages/ProtectedRoute';
import ListUser from './pages/admin/list-user';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/list-register" element={<HubungiKami/>}></Route>
        <Route path="/list-salon" element={<ProtectedRoute child={<ListSalon/>}/>}/>
        <Route path="/list-user" element={<ProtectedRoute child={<ListUser/>}/>}/>
        <Route path="/list-salon-customer" element={<ProtectedRoute child={<ListSalonCustomer/>}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
