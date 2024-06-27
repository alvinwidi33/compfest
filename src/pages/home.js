import React from 'react';
import NavbarHome from '../components/navbar-home';
import Carousel from '../components/carousel';
import styled from 'styled-components';
import Salon from '../components/images/salon.jpg';
import Footer from '../components/footer';
function Home() {
    const cardTitle={
        marginBottom:'8px',
        marginTop: '12px',
        textAlign: 'center',
        fontFamily:'Poppins, sans-serif',
        fontSize:'20px',
        fontWeight:'600',
        marginLeft:'8px',
        marginRight:'8px',
        color:'#020030'
    };
    const cardText={
        textAlign: 'center',
        fontFamily:'Poppins, sans-serif',
        fontSize:'14px',
        marginLeft:'8px',
        marginRight:'8px',
        marginBottom:'12px',
        color:'#020030'
    };
    const data = [
        { title: 'Haircuts and Styling', text:'Transformasi gaya rambut Anda dengan pelayanan Haircuts and Styling kami. Nikmati pengalaman potong rambut yang dipersonalisasi dan dijamin membuat Anda tampil lebih percaya diri setiap hari'},
        { title: 'Manicure and Pedicure',text:'Nikmati kecantikan tangan dan kaki dengan layanan Manicure and Pedicure kami. Kami menawarkan perawatan yang teliti dan berkualitas tinggi untuk merawat kulit dan kuku Anda dengan cara yang menyenangkan'},
        { title: 'Facial Treatments', text:'Ciptakan kulit yang sehat dan bercahaya dengan layanan Facial Treatments kami. Kami menawarkan berbagai perawatan wajah yang dipersonalisasi untuk memenuhi kebutuhan kulit Anda'},
    ];
    const cardContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '20px',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft:"11%"   ,
        marginTop:"28px"         
        };
    const Card = styled.div`
        width: 300px;
        height: 220px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 2.8);
        transition: transform 0.4s ease-out;
        transform-origin: center bottom;

        &:hover {
            transform: translateY(-24px);
        }
    `;
    return (
        <React.Fragment>
            <NavbarHome />
            <Carousel />
            <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box', height: '380px', backgroundColor: "#FEDACC", marginTop: "32px" }}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', textAlign: 'center', color: '#020030' }}>Pelayanan Kami</h1>
                <div style={cardContainer}>
                    {data.map((item, index) => (
                        <Card key={index}>
                            <h2 style={cardTitle}>{item.title}</h2>
                            <p style={cardText}>{item.text}</p>
                        </Card>
                    ))}
                </div>
            </div>
            <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box', height: '380px', backgroundColor: "#8A60FF"}}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', textAlign: 'center', color: 'white' }}>Tentang Kami</h1>
                <div className="inline-flex mt-6">
                    <p className="font-normal text-white mr-12 ml-16">Sea Salon telah melayani komunitas sejak tahun 2005, menawarkan pengalaman yang memanjakan dan transformatif dalam perawatan rambut dan kecantikan. Kami berkomitmen untuk memberikan layanan yang berkualitas tinggi dengan menggunakan produk terbaik dan teknik terbaru. Visi kami adalah untuk menjadi tujuan utama untuk perawatan kecantikan yang membuat pelanggan merasa percaya diri dan terawat.</p>
                    <img src={Salon} alt="Salon" className='w-96 h-auto rounded-md mr-28'></img>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default Home;