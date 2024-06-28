import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavbarHome from '../components/navbar-home';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [full_name, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch('https://compfest-be.vercel.app/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, email, username, password, phone_number }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Registrasi Berhasil! Silakan cek email Anda.");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 5000);
      } else {
        setErrorMessage(data.message || "Registrasi Gagal");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Terjadi error. Coba lagi nanti");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <div className="absolute w-[100%]">
        <NavbarHome />
        <div className="flex justify-center items-center mt-28">
          <div className="bg-[#8A60FF] h-[640px] w-[560px] relative rounded-lg mb-12">
            <form onSubmit={handleRegister} className="relative">
              <div className='mt-10 ml-10 text-white absolute w-full font-poppins'>
                <h1 className="text-4xl font-bold">Daftar Akun Baru</h1>
                <p className="text-xl font-normal mt-2">Lengkapi data dirimu</p>
              </div>
              <div className='mt-[148px] ml-10 text-white absolute inline-flex items-center' style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className="ml-2">Nama Lengkap</p>
              </div>
              <input
                type="text"
                className='mt-[178px] ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className='ml-2 mt-1'>Email</p>
              </div>
              <input
                type="email"
                className='mt-1 ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className='ml-2 mt-1'>Username</p>
              </div>
              <input
                type="username"
                className='mt-1 ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className='ml-2 mt-1'>Password</p>
              </div>
              <div className="relative mt-1 ml-[70px] w-[440px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className='h-9 w-full rounded-3xl pl-4 pr-10'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center'
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className='ml-2 mt-1'>Nomor Telepon</p>
              </div>
              <input
                type="text"
                className='mt-1 ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-white font-[Poppins, sans-serif] ml-48 mt-4">Sudah punya Akun? <span> </span>
                <Link to="/login" className='underline'>Masuk</Link>
              </p>
              <button type="submit" className="mt-8 ml-[70px] bg-[#FEDACC] rounded-3xl h-9 px-4 w-[440px] text-[#020030] font-semibold hover:bg-[#C3EAFD] hover:text-[#020030] focus:outline-none active:bg-[#FEDACC] active:text-[#020030] transition-colors duration-300">
                Daftar
              </button>
            </form>
            {successMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C3EAFD] p-4 rounded-lg shadow-lg flex items-center">
                <p className="text-[#020030]">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FEDACC] p-4 rounded-lg shadow-lg flex items-center">
                <p className="text-[#020030]">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;