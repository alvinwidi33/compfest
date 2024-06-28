import React from 'react';
import Logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://compfest-be.vercel.app/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('email')
        navigate('/login');
      } else {
        console.error("Gagal Keluar");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between font-[Poppins, sans-serif]">
        <img src={Logo} alt="Logo" className="h-12 w-auto ml-6" />
        <div className="flex space-x-8 mr-6">
          <Link to="/branch-list" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Daftar Cabang</Link>
          <Link to="/user-list" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Daftar User</Link>
          <button
            onClick={handleLogout}
            className="bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium"
          >
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;