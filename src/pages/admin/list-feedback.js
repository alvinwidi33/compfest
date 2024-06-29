import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/navbar-admin';
import Loading from '../../components/loading';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale'; 
function ListFeedback(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('None');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('https://compfest-be.vercel.app/api/reservation/get-list-reserve-feedback/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Assuming the API returns an array of feedback data
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Filter users based on name and rating
  useEffect(() => {
    const filteredResults = users.filter(user => {
      const nameMatch = user.name.user?.full_name.toLowerCase().includes(name.toLowerCase());
      const ratingMatch = rating === 'None' || user.rating === parseInt(rating);
      return nameMatch && ratingMatch;
    });
    setFilteredUsers(filteredResults);
  }, [name, rating, users]);
  const formatDate = (datetime) => {
    const parsedDate = parseISO(datetime);
    return format(parsedDate, "d MMMM yyyy", { locale: id }); 
  };
  const formatTime = (datetimeStart, datetimeEnd) => {
    const parsedStartTime = parseISO(datetimeStart);
    const parsedEndTime = parseISO(datetimeEnd);
    const startTime = format(parsedStartTime, "HH:mm");
    const endTime = format(parsedEndTime, "HH:mm");
    return `${startTime} - ${endTime}`; 
  };
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
          name="rating"
          className="h-9 w-28 bg-[#C3EAFD] mt-6 rounded-3xl pl-4 ml-4 custom-dropdown text-center text-[#020030]"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="None">Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-6">
           <table className="w-[1100px] divide-y divide-gray-200 rounded-lg overflow-hidden ml-20 text-center font-[Poppins, sans-serif]">
              <thead className="bg-[#8A60FF]">
              <tr>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Nama</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Username</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Cabang</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Tanggal</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Jam</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Ulasan</th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 whitespace-nowrap text-sm font-medium text-[#020030]">
                      {user.name.user?.full_name}
                    </td>
                    <td className=" whitespace-nowrap text-sm text-[#020030]">
                      {user.name.user?.username}
                    </td>
                    <td className=" py-2 whitespace-nowrap text-sm text-[#020030]">
                      {user.branch?.branch_name}
                    </td>
                    <td className=" py-2 whitespace-nowrap text-sm text-[#020030]">
                      {formatDate(user.datetime_start)}
                    </td>
                    <td className=" py-2 whitespace-nowrap text-sm text-[#020030]">
                      {formatTime(user.datetime_start, user.datetime_end)}
                    </td>
                    <td className=" py-2 whitespace-nowrap text-sm text-[#020030]">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>
                        {index < user.rating ? '★' : '☆'}
                        </span>
                    ))}
                    </td>
                    <td className=" py-2 whitespace-nowrap text-sm text-[#020030]">{user.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default ListFeedback;