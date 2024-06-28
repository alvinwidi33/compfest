import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/navbar-admin';
import Loading from '../../components/loading'; // Adjust import path if necessary
import { Link } from 'react-router-dom';
function ListSalonAdmin() {
   const [salons, setSalons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("None");
  const [locations, setLocations] = useState([]);

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchSalons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://compfest-be.vercel.app/api/branch/get-list-branch/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + window.localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSalons(data);
          const uniqueLocations = [...new Set(data.map(salon => salon.branch_location))];
          setLocations(uniqueLocations);
        } else {
          console.error('Failed to fetch salons');
        }
      } catch (error) {
        console.error('Error fetching salons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredSalons = salons.filter(salon => {
    if (selectedLocation === "None") {
      return true; 
    } else {
      return salon.branch_location === selectedLocation;
    }
  });

  return (
    <React.Fragment>
      <NavbarAdmin />
      <h1 className="mt-28 text-center text-3xl font-semibold font-[Poppins, sans-serif] text-[#020030]">Daftar Salon</h1>
      <div className="flex justify-center mt-4">
        <select
          name="daerah"
          value={selectedLocation}
          onChange={handleLocationChange}
          className='h-9 w-28 bg-[#C3EAFD] rounded-3xl pl-4 font-[Poppins, sans-serif] custom-dropdown mr-4 text-[#020030]'
        >
          <option value="None">Lokasi</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <Link to="/add-salon">
        <button className="ml-3 bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium mb-4">
        Tambah Cabang
        </button>
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-3 gap-6 mt-4">
            {filteredSalons.map((salon) => (
              <div key={salon.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
                <img
                  src={salon.image}
                  alt={salon.branch_name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="mt-2 ml-4 font-[Poppins, sans-serif] text-[#020030]">
                  <h2 className="text-xl font-bold">{salon.branch_name}</h2>
                  <p className="mb-2 text-sm">Lokasi: {salon.branch_location}</p>
                  <p className="mb-2 text-sm">Jam Buka: {formatTime(salon.opening_time)} - {formatTime(salon.closing_time)}</p>
                  <Link to={`/list-salon/${salon.id}`}>
                  <button className="ml-36 bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium mb-4">
                    Pesan
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default ListSalonAdmin;