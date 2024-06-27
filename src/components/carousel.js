import React from 'react';
import Slider from 'react-slick';
import gambar1 from '../components/images/Rectangle 6.png';
import gambar2 from '../components/images/Rectangle 7.png';
import gambar3 from '../components/images/Rectangle 8.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', right: '10px', zIndex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
            onClick={onClick}
        >
            <i className="fas fa-chevron-right" style={{ color: 'white', fontSize: '24px' }}></i>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', left: '10px', zIndex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
            onClick={onClick}
        >
            <i className="fas fa-chevron-left" style={{ color: 'white', fontSize: '24px' }}></i>
        </div>
    );
};

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings}>
            <div className='ml-16'>
                <img src={gambar1} alt="Gambar 1" className="w-[90%] h-auto" />
            </div>
            <div className='ml-16'>
                <img src={gambar2} alt="Gambar 2" className="w-[90%] h-auto" />
            </div>
            <div className='ml-16'>
                <img src={gambar3} alt="Gambar 3" className="w-[90%] h-auto" />
            </div>
        </Slider>
    );
}

export default Carousel;
