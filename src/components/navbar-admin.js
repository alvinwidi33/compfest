import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function NavbarCustomer() {
  const [activeUser, setActiveUser] = useState({});
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `https://compfest-be.vercel.app/api/users/get-user-by-token/${token}/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const json_response = await response.json();
                    setActiveUser(json_response);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (token) {
            getUser();
        }
    }, [token])
    const handleLogout = () => {
      window.localStorage.removeItem("token");
      setTimeout(() => {
          navigate("/");
      }, 2000);
    };
  return (
    <nav className="bg-white shadow-sm py-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between font-[Poppins, sans-serif]">
        <div className="flex items-center space-x-8 ml-6">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
          <Link to="/list-salon-admin" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Daftar Cabang</Link>
          <Link to="/list-user" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Daftar Customer</Link>
          <Link to="/user-list" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Daftar Feedback</Link>
        </div>
        <div className="flex items-center justify-end space-x-8 mr-6">
          <div className="flex flex-col text-right">
            <p className="text-[#020030] font-medium">{activeUser.user?.full_name}</p>
            <p className="text-[#020030] font-normal text-sm">{activeUser.user?.email}</p>
          </div>
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

export default NavbarCustomer;