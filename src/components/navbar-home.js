import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function NavbarHome() {
    return (
        <nav className="bg-white shadow-sm py-4 w-full fixed top-0 z-50">
            <div className="container mx-auto flex items-center justify-between font-[Poppins, sans-serif]">
                <img src={logo} alt="Logo" className="h-12 w-auto ml-6" />
                <div className="flex space-x-8 mr-6">
                    <Link to="/" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Beranda</Link>
                    <Link to="/contact" className="text-[#020030] hover:text-[#8A60FF] font-medium active:text-[#020030] mt-2">Hubungi Kami</Link>
                    <Link to="/login">
                        <button className="bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium">
                            Masuk
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavbarHome;