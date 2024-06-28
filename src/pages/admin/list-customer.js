import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/navbar-admin';
import Loading from '../../components/loading';

function ListCustomer() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://compfest-be.vercel.app/api/users/get-list-customer/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + window.localStorage.getItem("token"),
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (customerId) => {
    try {
      const response = await fetch(`https://compfest-be.vercel.app/api/users/update-status/${customerId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + window.localStorage.getItem("token"),
        },
        body: JSON.stringify({ status: 'Member' }), // Adjust as needed
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to update user status');
      }
      fetchUsers(); // Refresh user list after successful update
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <React.Fragment>
      <NavbarAdmin />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto">
          <h1 className="mt-28 text-3xl font-semibold text-[#020030] text-center">Daftar Pengguna</h1>
          <div className="mt-6">
            <table className="w-[1000px] divide-y divide-gray-200 rounded-lg overflow-hidden ml-32 text-center">
              <thead className="bg-[#8A60FF]">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">No. HP</th>
                  <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user.user?.user_id} className={index % 2 === 1 ? 'bg-[#C3EAFD]' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.user?.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#020030]">{user.user?.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.user?.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#020030]">{user.user?.phone_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleStatusChange(user.customer_id)} // Pass customer_id here
                        className={`text-sm px-3 py-1 rounded-md ${
                          user.status === 'Member' ? 'bg-[#FEDACC] text-[#020030]' : 'bg-[#8A60FF] text-white'
                        } hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC]`}
                      >
                        {user.status === 'Member' ? 'Member' : 'Not Member'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ListCustomer;