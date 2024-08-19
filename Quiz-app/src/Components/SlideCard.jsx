import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { card } from '../assets/assets'; // Ensure this path is correct

const SlideCard = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen'>
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
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className='max-w-[90%] lg:max-w-[80%]'
      >
        {card.map((item) => (
          <SwiperSlide key={item.id}> {/* Ensure each item has a unique id */}
            <div className='flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden'>
              <div>
                <img
                  src={item.card_image}
                  alt="image"
                  className='w-full h-full object-cover'
                /> 
              </div>
              <div className='relative flex flex-col gap-3'>
                <img
                  src={item.card_icon}
                  alt="icon"
                  className='w-[32px] h-[32px]'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideCard;
