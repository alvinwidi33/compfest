
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import HubungiKami from './pages/hubungi-kami';
import Register from './pages/register';
import AddSalon from './pages/admin/add-salon';
import ListFeedback from './pages/admin/list-feedback';
import ListSalonCustomer from './pages/customer/list-salon-customer';
import ProtectedRoute from './pages/ProtectedRoute';
import ListCustomer from './pages/admin/list-customer';
import UpdateSalon from './pages/admin/update-salon';
import ListSalonAdmin from './pages/admin/list-salon-admin';
import AddReservation from './pages/customer/add-reservation';
import ListReservation from './pages/customer/list-reservation';
import UpdateReservation from './pages/customer/update-reservation';
import ListHistory from './pages/customer/list-history';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/contact" element={<HubungiKami/>}></Route>
        <Route path="/list-salon-admin" element={<ProtectedRoute child={<ListSalonAdmin/>}/>}/>
        <Route path="/list-feedback" element={<ProtectedRoute child={<ListFeedback/>}/>}/>
        <Route path="/list-salon-admin/:id" element={<ProtectedRoute child={<UpdateSalon/>}/>}/>
        <Route path="/add-salon" element={<ProtectedRoute child={<AddSalon/>}/>}/>
        <Route path="/list-user" element={<ProtectedRoute child={<ListCustomer/>}/>}/>
        <Route path="/list-salon-customer" element={<ProtectedRoute child={<ListSalonCustomer/>}/>}/>
        <Route path="/list-salon-customer/:id" element={<ProtectedRoute child={<AddReservation/>}/>}/>
        <Route path="/list-reservation" element={<ProtectedRoute child={<ListReservation/>}/>}/>
        <Route path="/list-reservation/:id" element={<ProtectedRoute child={<UpdateReservation/>}/>}/>
        <Route path="/list-history" element={<ProtectedRoute child={<ListHistory/>}/>}/>
      </Routes>
    </Router>
  );
}
export default App;