import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import NavbarAdmin from '../../components/navbar-admin';
import Loading from '../../components/loading';
import { useNavigate, Link } from 'react-router-dom';
import ConfirmationModal from '../../components/confirmation-modal';

function AddSalon() {
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [branch, setBranch] = useState({
        branch_name: '',
        branch_location: '',
        image: '',
        opening_time: '',
        closing_time: ''
    });
    const navigate = useNavigate();
    const supabaseUrl = 'https://bxeiejekgnstwrltydba.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZWllamVrZ25zdHdybHR5ZGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NTkyMzEsImV4cCI6MjAzNTAzNTIzMX0.911Jt0faURzETXekRM2_hQNyYTDsvpXRc0qmw6U-rq0';
    const supabase = createClient(supabaseUrl, supabaseKey);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setBranch((prevBranch) => ({
                ...prevBranch,
                image: files[0]
            }));
        } else {
            setBranch((prevBranch) => ({
                ...prevBranch,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);
        const openingTime = new Date(`1970-01-01T${branch.opening_time}:00`);
        const closingTime = new Date(`1970-01-01T${branch.closing_time}:00`);
        if (openingTime > closingTime){
            alert("Jam buka tidak boleh lebih dari jam tutup")
            return;
        }
        const token = window.localStorage.getItem("token");
        setLoading(true);

        try {
            const imageFile = branch.image;
            const imageExt = imageFile.name.split('.').pop();
            const imageName = `${Date.now()}.${imageExt}`;
            const { data, error: uploadError } = await supabase.storage
                .from('branch')
                .upload(imageName, imageFile);

            if (uploadError) {
                throw uploadError;
            }

            const { data: publicURL, error: publicUrlError } = supabase
                .storage
                .from('branch')
                .getPublicUrl(imageName);

            if (publicUrlError) {
                throw publicUrlError;
            }

            const updatedBranch = { ...branch, image: publicURL.publicUrl };

            const response = await fetch('https://compfest-be.vercel.app/api/branch/add-branch/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + token,
                },
                body: JSON.stringify(updatedBranch)
            });

            if (response.ok) {
                setSuccessMessage("Berhasil menambah cabang!");
                setErrorMessage("");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/list-salon-admin");
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "❌ Gagal Menambah Cabang");
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("❌ Terjadi error. Coba lagi nanti");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <NavbarAdmin />
            <div style={{ marginLeft: "10%", position: "absolute" }} className="w-9/12">
                <div className="w-full mt-24">
                    <h1 className="ml-24 font-semibold text-[#020030] text-center font-[Poppins, sans-serif] text-2xl">Form Tambah Cabang</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-4 mb-4 ml-20 mt-4">
                            <div>
                                <p className="text-[#020030] font-medium ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Nama Cabang*</p>
                                <input
                                    type="text"
                                    name="branch_name"
                                    className='bg-[#EFF5F5] mt-2 h-9 w-[440px] rounded-3xl pl-4'
                                    value={branch.branch_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p className="text-[#020030] font-medium ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Lokasi*</p>
                                <input
                                    type="text"
                                    name="branch_location"
                                    className='bg-[#EFF5F5] h-9 w-[440px] rounded-3xl pl-4 mt-2'
                                    value={branch.branch_location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-4 ml-20 mt-4">
                            <div>
                                <p className="text-[#020030] font-medium ml-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Jam Buka*</p>
                                <input
                                    type="time"
                                    name="opening_time"
                                    className='bg-[#EFF5F5] mt-2 h-9 w-[440px] rounded-3xl pl-4'
                                    value={branch.opening_time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p className="text-[#020030] font-medium ml-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Jam Tutup*</p>
                                <input
                                    type="time"
                                    name="closing_time"
                                    className='bg-[#EFF5F5] h-9 w-[440px] rounded-3xl pl-4 mt-2'
                                    value={branch.closing_time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-[#020030] font-medium mt-2 ml-20" style={{ fontFamily: 'Inter, sans-serif' }}>Foto*</p>
                        <div className="flex flex-col space-y-4 mb-4 ml-20 mt-2">
                            <div>
                                <input
                                    type="file"
                                    name="image"
                                    className='custom-file-input bg-[#EFF5F5] h-9 w-[900px] rounded-3xl pl-4'
                                    accept="image/png, image/jpeg"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-4 ml-[430px]">
                            <Link to="/list-salon-admin">
                                <button
                                    type="button"
                                    className="bg-[#C3EAFD] text-[#020030] py-2 px-4 rounded-md hover:bg-[#8A60FF] hover:text-white active:bg-[#C3EAFD] active:text-[#020030] transition"
                                >
                                    Batal
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium"
                            >
                                Tambah
                            </button>
                        </div>
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
            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                message="Apakah Anda yakin ingin membuat user?"
            />
            <style>
                {`
                .custom-file-input {
                    font-size: 0.875rem;
                    padding: 2px;
                }
                .custom-file-input::-webkit-file-upload-button {
                    padding: 4px 8px;
                    font-size: 0.875rem;
                    background-color: #EFF5F5;
                    border: none;
                    border-radius: 3px;
                }
                .custom-file-input::-moz-file-upload-button {
                    padding: 4px 8px;
                    font-size: 0.875rem;
                    background-color: #EFF5F5;
                    border: none;
                    border-radius: 3px;
                }
                `}
            </style>
        </React.Fragment>
    );
}

export default AddSalon;