import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'; // Import autoplay CSS
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
const SlideCard = () => {
  const [loading, setLoading] = useState(true);
  const [Cssimages, setCssImages] = useState([]);
  useEffect(() => {
    const fetchCssImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/CssBattle/getall');
        setCssImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CssImages:', error);
      }
    };
    fetchCssImages();
  }, []);
  console.log(Cssimages);
  return (
    <div className='flex items-center justify-center flex-col h-[90vh]'>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mx-auto table">
                  CSS Challenges
                </h1>
    <p className="mx-auto font-semibold table m-10 md:text-xl text-gray-500">
                  Choose an image and test your CSS Skills.
                </p>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
       
        autoplay={{
          delay: 0, // No delay between transitions
          disableOnInteraction: false, // Allows user interaction
        }}
        speed={5000} // Speed for smooth sliding
        loop={true} // Makes the slider loop continuously
        modules={[FreeMode, Pagination, Autoplay]} // Add Autoplay to modules
        className='max-w-[90%] lg:max-w-[80%]'
      >
        {
        Cssimages.map((image) => (
          <SwiperSlide key={image._id}>
          <div className=' shadow-2xl bg-slate-800 flex flex-col justify-center gap-6 group relative  text-white rounded-xl px-6 py-8  w-[215px] lg:h-[400px] lg:w-[350px] hover:scale-105 transition duration-500 ease-in-out'>
            <div>
              <img
                src={image.image}
                alt="image"
                className='w-full h-full object-cover hover:scale-105 transition duration-500 ease-in-out'
              /> 
            </div>
            <div className='relative flex flex-col gap-3'>
            <Link
              to={`/cssBattle/${image.name}`} // or any other id
              state={{ targetImage: image.image }}
              className='bg-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-sky-700 text-white transition duration-500 ease-in-out text-center'
            >
              Play
            </Link>

            </div>
          </div>
        </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
};

export default SlideCard;
