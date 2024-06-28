import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginImage from '../components/images/salon2.jpg'; // Ensure the image import matches your file path
import NavbarHome from '../components/navbar-home';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch('https://compfest-be.vercel.app/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password }), 
      });

      const data = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("name", data.user.full_name);
        window.localStorage.setItem("role", data.user.role);
        window.localStorage.setItem("email", data.user.email);
        setSuccessMessage("Berhasil Masuk!");

        setTimeout(() => {
          setSuccessMessage("");
          if (data.user.role === 'Customer') {
            navigate("/list-salon-customer");
          } else if (data.user.role === 'Admin') {
            navigate("/list-salon");
          } 
        }, 2000);
      } else {
        setErrorMessage(data.message || "Gagal Masuk");
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
          <img src={loginImage} alt="login" className="w-72 h-auto rounded-bl-lg rounded-tl-lg" />
          <div className="bg-[#8A60FF] h-[432px] w-[560px] relative rounded-tr-lg rounded-br-lg">
            <form onSubmit={handleLogin} className="relative">
              <div className='mt-10 ml-10 text-white absolute w-full font-poppins'>
                <h1 className="text-4xl font-bold">Selamat Datang!</h1>
                <p className="text-xl font-normal mt-2">Masuk ke Akunmu</p>
              </div>
              <div className='mt-[148px] ml-10 text-white absolute inline-flex items-center' style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p className="ml-2">Username atau Email</p>
              </div>
              <input
                type="text"
                className='mt-[178px] ml-[70px] h-9 w-[440px] rounded-3xl pl-4'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              <div className="mt-1 ml-9 text-white inline-flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              <p className="text-white font-[Poppins, sans-serif] ml-48 mt-4">Belum punya Akun? <span> </span>
              <Link to="/register" className='underline'>Daftar</Link>
              </p>
              <button type="submit" className="mt-8 ml-[70px] bg-[#FEDACC] rounded-3xl h-9 px-4 w-[440px] text-[#020030] font-semibold hover:bg-[#C3EAFD] hover:text-[#020030] focus:outline-none active:bg-[#FEDACC] active:text-[#020030] transition-colors duration-300">
                Masuk
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

export default Login;
