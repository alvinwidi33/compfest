import React from 'react';
import NavbarHome from '../components/navbar-home';
import Footer from '../components/footer';
import telepon from '../components/images/Free Photo _ Woman answering an old retro telephone.jpeg';

function HubungiKami() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarHome/>
            <div className="flex-grow flex justify-center items-center mt-28 mb-20 text-[#020030] font-[Poppins, sans-serif]">
                <div className="relative">
                    <img src={telepon} alt="login" className="w-[170px] h-auto rounded-bl-lg rounded-tl-lg" style={{ filter: 'grayscale(100%)' }} />
                    <div className="absolute inset-0 bg-[#8A60FF] opacity-30 rounded-bl-lg rounded-tl-lg"></div>
                </div>
                <div className="bg-[#FEDACC] h-[238px] w-[400px] relative rounded-tr-lg rounded-br-lg">
                    <h1 className="font-semibold text-2xl text-center mt-6">Hubungi Kami</h1>
                    <p className="font-normal ml-6 mt-3">Jika Anda memiliki pertanyaan mengenai layanan kami silakan hubungi :</p>
                    <p className="font-normal ml-6 mt-3">
                        📱 Thomas - <a className='underline' href="https://api.whatsapp.com/send?phone=628123456789" target="_blank" rel="noopener noreferrer">08123456789</a>
                    </p>
                    <p className="font-normal ml-6 mt-1">
                        📱 Sekar - <a className='underline' href="https://api.whatsapp.com/send?phone=628164829372" target="_blank" rel="noopener noreferrer">08164829372</a>
                    </p>
                </div>
            </div>
            <Footer className="mt-auto"/>
        </div>
    );
}

export default HubungiKami;