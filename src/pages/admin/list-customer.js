import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/navbar-admin';
import Loading from '../../components/loading';

function ListCustomer() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [member, setMember] = useState('None');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://compfest-be.vercel.app/api/users/get-list-customer/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + window.localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      let filtered = users;
      if (name) {
        filtered = filtered.filter((user) => user.user?.full_name && user.user.full_name.toLowerCase().includes(name.toLowerCase()));
      }
      if (member !== 'None') {
        filtered = filtered.filter((user) => user.status === member);
      }
      setFilteredUsers(filtered);
    };
    filterUsers();
  }, [name, member, users]);

  const handleStatusChange = async (customerId, currentStatus) => {
    const newStatus = currentStatus === 'Member' ? 'Not Member' : 'Member';
    try {
      const response = await fetch(`https://compfest-be.vercel.app/api/users/update-status/${customerId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + window.localStorage.getItem('token'),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to update user status');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <NavbarAdmin />
      <div className="container mx-auto">
        <h1 className="mt-24 text-3xl font-semibold text-[#020030] text-center">Daftar Customer</h1>
        <input
          type="text"
          name="name"
          className="bg-[#C3EAFD] ml-[340px] mt-6 h-9 w-[500px] rounded-3xl pl-4 text-[#020030]"
          placeholder="Cari berdasarkan nama . . ."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          name="member"
          className="h-9 w-28 bg-[#C3EAFD] mt-6 rounded-3xl pl-4 ml-4 custom-dropdown text-[#020030]"
          value={member}
          onChange={(e) => setMember(e.target.value)}
        >
          <option value="None">Status</option>
          <option value="Member">Member</option>
          <option value="Not Member">Not Member</option>
        </select>
        <div className="mt-4">
          <table className="w-[1100px] divide-y divide-gray-200 rounded-lg overflow-hidden ml-20 text-center">
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
              {filteredUsers.map((user, index) => (
                <tr key={user.user?.user_id} className={index % 2 === 1 ? 'bg-[#C3EAFD]' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.user?.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#020030]">{user.user?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#020030]">{user.user?.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#020030]">{user.user?.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleStatusChange(user.customer_id, user.status)}
                      className={`text-sm px-4 py-2 rounded-md ${
                        user.status === 'Member' ? 'bg-[#FEDACC] text-[#020030]' : 'bg-[#8A60FF] text-white hover:bg-[#FEDACC] hover:text-[#020030] active:bg-[#8A60FF] active:text-white'
                      }`}
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
    </React.Fragment>
  );
}

export default ListCustomer;