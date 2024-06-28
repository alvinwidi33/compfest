import React from 'react';
import NavbarAdmin from '../../components/navbar-admin';

function ListSalon() {
  // Dummy data for demonstration
  const salons = [
    {
      id: 1,
      name: "Salon A",
      location: "Jalan ABC No. 123, Jakarta",
      openingHours: "09:00 - 21:00",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Salon B",
      location: "Jalan XYZ No. 456, Jakarta",
      openingHours: "08:00 - 20:00",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Salon C",
      location: "Jalan DEF No. 789, Jakarta",
      openingHours: "10:00 - 22:00",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 4,
      name: "Salon D",
      location: "Jalan GHI No. 101, Jakarta",
      openingHours: "11:00 - 23:00",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];

  return (
    <React.Fragment>
      <NavbarAdmin />
      <h1 className="mt-28 text-center text-3xl font-semibold font-[Poppins, sans-serif] text-[#020030]">Daftar Salon</h1>
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-3 gap-6 mt-6">
          {salons.map((salon) => (
            <div key={salon.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
              <img
                src={salon.image}
                alt={salon.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="mt-2 ml-4 font-[Poppins, sans-serif] text-[#020030]">
                <h2 className="text-xl font-bold">{salon.name}</h2>
                <p className="mb-2 text-sm">Lokasi: {salon.location}</p>
                <p className="mb-2 text-sm">Jam Buka: {salon.openingHours}</p>
                <button className="ml-36 bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium mb-4">
                  Ubah
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListSalon;
