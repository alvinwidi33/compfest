import React, { useState, useEffect } from 'react';
import NavbarCustomer from '../../components/navbar-customer';
import Loading from '../../components/loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../components/confirmation-modal';

function AddReservation() {
  const [activeUser, setActiveUser] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [salon, setSalon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserve, setReserve] = useState({
    name: '',
    branch: id,
    type_of_service: '',
    datetime_start: '',
    datetime_end: '',
  });

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchUserData = async () => {
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
          const data = await response.json();
          setActiveUser(data);
          setReserve(prevState => ({
            ...prevState,
            name: data.customer_id,
          }));
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const fetchSalons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://compfest-be.vercel.app/api/branch/get-branch-detail/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSalon(data);
        } else {
          console.error('Failed to fetch salon details');
        }
      } catch (error) {
        console.error('Error fetching salon details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalons();
  }, [id, token]);

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'date' || name === 'time') {
    const today = new Date().toISOString().split('T')[0];
    const timePart = name === 'date' ? reserve.datetime_start.split('T')[1] || '00:00' : value;
    const datePart = name === 'date' ? value : reserve.datetime_start.split('T')[0] || today;

    if (!timePart || !datePart) {
      return; 
    }

    const datetimeStart = `${datePart}T${timePart}`;

    if (isNaN(new Date(datetimeStart))) {
      return; 
    }

    const datetimeEnd = new Date(datetimeStart);
    datetimeEnd.setHours(datetimeEnd.getHours() + 1);

    const offset = datetimeEnd.getTimezoneOffset() * 60000;
    const adjustedDatetimeEnd = new Date(datetimeEnd.getTime() - offset);

    setReserve(prevState => ({
      ...prevState,
      datetime_start: datetimeStart,
      datetime_end: adjustedDatetimeEnd.toISOString().slice(0, 19),
    }));
  } else {
    setReserve(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setIsLoading(false);
    const currentTime = new Date().toISOString();
    const reserveStartTime = new Date(reserve.datetime_start).toISOString();

    if (reserveStartTime < currentTime) {
      setShowModal(false);
      alert("Waktu tidak boleh kurang dari saat ini");
      return;
    }

    const reserveDateTime = new Date(reserve.datetime_start);
    const reserveTime = `${reserveDateTime.getHours()}:${reserveDateTime.getMinutes()}`;

    if (reserveTime < salon.opening_time || reserveTime > salon.closing_time) {
      alert('Waktu yang kamu pilih diluar jam buka/tutup');
      return;
    }

    try {
      const response = await fetch('https://compfest-be.vercel.app/api/reservation/add-reserve/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(reserve),
      });

      if (response.ok) {
        setSuccessMessage("Berhasil membuat reservasi!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/list-reservation");
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "❌ Gagal Membuat Reservasi");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("❌ Terjadi error. Coba lagi nanti");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const isNotMember = activeUser.status === "Not Member";

  return (
    <React.Fragment>
      <NavbarCustomer />
      <h1 className="mt-24 font-semibold text-[#020030] text-center font-[Poppins, sans-serif] text-2xl">
        Form Tambah Reservasi
      </h1>
      <div className="mt-4 w-full flex text-[#020030] font-[Poppins, sans-serif]">
        <img
          src={salon.image}
          alt={salon.branch_name}
          className="w-96 h-60 object-cover rounded-md mt-4 ml-20"
        />
        <div className="col-auto ml-6">
          <div className="flex mt-4">
            <h1 className="font-semibold">CABANG</h1>
            <p className="font-normal ml-3">{salon.branch_name}</p>
          </div>
          <div className="flex mt-2">
            <h1 className="font-semibold">LOKASI</h1>
            <p className="font-normal ml-3">{salon.branch_location}</p>
          </div>
          <div className="flex mt-2">
            <h1 className="font-semibold">JAM BUKA</h1>
            <p className="font-normal ml-3">{formatTime(salon.opening_time)} - {formatTime(salon.closing_time)}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-4">
              <select
                required
                name="type_of_service"
                value={reserve.type_of_service}
                onChange={handleInputChange}
                className="border border-[#C3EAFD] border-solid h-9 w-40 bg-[#C3EAFD] rounded-3xl pl-4 font-[Poppins, sans-serif] custom-dropdown mr-4 text-[#020030]"
              >
                <option value="None">Tipe Pelayanan</option>
                <option value="Haircuts and styling">Haircuts and styling</option>
                <option value="Manicure and pedicure">Manicure and pedicure</option>
                <option value="Facial treatments">Facial treatments</option>
              </select>
              <input
                min={new Date().toISOString().split("T")[0]}
                required
                type="date"
                name="date"
                value={reserve.datetime_start.split('T')[0]}
                onChange={handleInputChange}
                className="bg-[#C3EAFD] rounded-3xl h-9 w-40 text-center border border-[#C3EAFD] border-solid"
              />
              <input
                required
                type="time"
                name="time"
                value={reserve.datetime_start.split('T')[1]}
                onChange={handleInputChange}
                className="bg-[#C3EAFD] rounded-3xl h-9 w-40 text-center border border-[#C3EAFD] border-solid ml-4"
              />
            </div>
            <div className="flex space-x-4 mt-10 ml-36">
              <Link to="/list-salon-customer">
                <button
                  type="button"
                  className="bg-[#C3EAFD] text-[#020030] py-2 px-4 rounded-md hover:bg-[#8A60FF] hover:text-white active:bg-[#C3EAFD] active:text-[#020030] transition"
                >
                  Batal
                </button>
              </Link>
              <button
                type="submit"
                className={`bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md font-medium
                  ${isNotMember ? 'opacity-50 cursor-not-allowed' : ''}
                  ${!isNotMember ? 'hover:bg-[#8A60FF] hover:text-white' : ''}`}
                disabled={isNotMember}
              >
                Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
      {successMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C3EAFD] p-4 rounded-lg shadow-lg flex items-center">
          <p className="text-[#020030]">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded-lg shadow-lg flex items-center">
          <p className="text-white">{errorMessage}</p>
        </div>
      )}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirm}
        onClose={() => setShowModal(false)}
        title="Konfirmasi Reservasi"
        message="Apakah Anda yakin ingin menambahkan reservasi?"
      />
    </React.Fragment>
  );
}

export default AddReservation;