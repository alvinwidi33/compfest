import React from 'react';
import logo from './images/logo.png';

function Footer() {
    return (
        <div className="footer font-Poppins sans-serif text-020030 inline-flex mt-4 mb-4">
            <div className='ml-12'>
                <div className="font-bold text-xl">Contact Details:</div>
                <div className="contact-details font-normal">
                    <p>Thomas - 08123456789</p>
                    <p>Sekar - Phone Number: 08164829372</p>
                </div>
            </div>
            <img src={logo} alt="Logo" className="logo w-44 ml-[700px]" />
        </div>
    );
}

export default Footer;
