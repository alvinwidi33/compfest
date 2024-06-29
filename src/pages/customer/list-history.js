// ListHistory.js
import React, { useState, useEffect } from 'react';
import NavbarCustomer from '../../components/navbar-customer';
import Loading from '../../components/loading';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale'; 
import Feedback from '../../components/feedback'; 

function ListHistory() { 
  const [activeUser, setActiveUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentReservationId, setCurrentReservationId] = useState(null);
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
        `https://compfest-be.vercel.app/api/reservation/get-list-reserve-customer-history/${activeUser.customer_id}/`,
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
        // Re-fetch reservations after updating status
        await fetchReservations();
      } else {
        console.error('Failed to update reservation status');
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFeedback = (reservationId) => {
    setCurrentReservationId(reservationId);
    setIsFeedbackOpen(true);
  };

  const handleFeedbackSubmit = async ({ rating, feedback }) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://compfest-be.vercel.app/api/reservation/patch-reserve/${currentReservationId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, feedback }),
        }
      );

      if (response.ok) {
        await fetchReservations();
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsLoading(false);
      setIsFeedbackOpen(false);
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
        <h1 className="mt-24 text-3xl font-semibold text-[#020030] text-center font-[Poppins, sans-serif]">Riwayat Reservasi</h1>
        <div className="mt-4">
          <table className="w-[1100px] divide-y divide-gray-200 rounded-lg overflow-hidden ml-20 text-center font-[Poppins, sans-serif]">
            <thead className="bg-[#8A60FF]">
              <tr>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Cabang</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Tipe Layanan</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Tanggal</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Jam</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Ulasan</th>
                <th className="py-3 text-xs font-medium text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation, index) => (
                <tr key={reservation.id} className={index % 2 === 1 ? 'bg-[#C3EAFD]' : 'bg-white'}>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{reservation.branch?.branch_name}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{reservation.type_of_service}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{formatDate(reservation.datetime_start)}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">{formatTime(reservation.datetime_start, reservation.datetime_end)}</td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < reservation.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">
                    {reservation.rating === 0 || reservation.feedback === null ? 'Belum Mengisi' : reservation.feedback}
                  </td>
                  <td className="py-2 whitespace-nowrap text-sm text-[#020030]">
                    <button
                        className={`py-2 px-4 rounded-md font-medium ${
                            reservation.feedback !== null || reservation.rating !== 0
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-[#FEDACC] text-[#020030] hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC]'
                        }`}
                        disabled={reservation.feedback !== null || reservation.rating !== 0 || reservation.is_cancel === true}
                        onClick={() => handleOpenFeedback(reservation.id)}
                        >
                        Ulasan
                        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Feedback
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </React.Fragment>
  );
}

export default ListHistory;