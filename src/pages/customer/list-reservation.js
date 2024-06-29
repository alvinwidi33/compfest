import React, { useState, useEffect } from 'react';
import NavbarCustomer from '../../components/navbar-customer';
import Loading from '../../components/loading';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale'; 

function ListReservation() {
  const [activeUser, setActiveUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = window.localStorage.getItem("token");

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
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchReservations = async () => {
    if (!activeUser.customer_id) return [];
    try {
      const response = await fetch(
        `https://compfest-be.vercel.app/api/reservation/get-list-reserve-customer/${activeUser.customer_id}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReservations(data);
        return data;
      } else {
        console.error('Failed to fetch reservations');
        return [];
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token && activeUser.customer_id) {
      fetchReservations();
    }
  }, [token, activeUser]);

  const handleStatusChange = async (id, statusType, currentValue) => {
    try {
      const response = await fetch(
        `https://compfest-be.vercel.app/api/reservation/patch-reserve/${id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [statusType]: !currentValue }),
        }
      );

      if (response.ok) {
        await fetchReservations();
        setIsLoading(true);
      } else {
        console.error('Failed to update reservation status');
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <NavbarCustomer />
      <div>
        <h1 className="mt-24 text-3xl font-semibold text-[#020030] text-center">Daftar Reservasi</h1>
        <div className="mt-4">
          <table className="w-[1100px] divide-y divide-gray-200 rounded-lg overflow-hidden ml-20 text-center">
            <thead className="bg-[#8A60FF]">
              <tr>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Cabang</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Lokasi</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Tipe Layanan</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Tanggal</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Jam</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation, index) => (
                <tr key={reservation.id} className={index % 2 === 1 ? 'bg-[#C3EAFD]' : 'bg-white'}>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{reservation.branch?.branch_name}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{reservation.branch?.branch_location}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-gray-900">{reservation.type_of_service}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{formatDate(reservation.datetime_start)}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{formatTime(reservation.datetime_start, reservation.datetime_end)}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">
                    <button
                      onClick={() => handleStatusChange(reservation.id, 'is_cancel', reservation.is_cancel)}
                      disabled={reservation.is_cancel || reservation.is_done}
                      className={`text-sm px-4 py-2 rounded-md ${reservation.is_cancel || reservation.is_done ? 'bg-gray-300 text-gray-600' : 'bg-[#FF605A] text-white hover:bg-[#FEDACC] hover:text-[#020030] active:bg-[#FF605A] active:text-white'}`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleStatusChange(reservation.id, 'is_done', reservation.is_done)}
                      disabled={reservation.is_done || reservation.is_cancel}
                      className={`text-sm px-4 py-2 ml-2 rounded-md ${reservation.is_done || reservation.is_cancel ? 'bg-gray-300 text-gray-600' : 'bg-[#8A60FF] text-white hover:bg-[#FEDACC] hover:text-[#020030] active:bg-[#8A60FF] active:text-white font-medium'}`}
                    >
                      Selesai
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

export default ListReservation;
