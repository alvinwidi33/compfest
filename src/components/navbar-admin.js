import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../components/navbar-admin';
import Loading from '../components/loading'; 

function ListUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = window.localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://compfest-be.vercel.app/api/users/get-list-user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUsers(data);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); 
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]); // Add token to dependency array to fetch data when token changes

  return (
    <React.Fragment>
      <NavbarAdmin />
      {isLoading ? (
        <Loading /> // Show Loading component while data is being fetched
      ) : (
        <div className="container mx-auto mt-12">
          <h1 className="text-3xl font-semibold text-[#020030]">Daftar Pengguna</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.user_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#020030]">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ListUser;