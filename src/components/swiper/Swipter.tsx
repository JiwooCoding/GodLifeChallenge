import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import giftpoint from '../../image/mainpage/01 (9).png'
import './Swiper.scss'
import { Link } from 'react-router-dom';
import attendance from '../../image/mainpage/01 (8).png'


const Swipter = () => {
  return (
    <>
      <Swiper
        slidesPerView={1.5} // 한 번에 보여줄 슬라이드 수
        spaceBetween={60} // 슬라이드 사이의 간격
        centeredSlides={true} // 슬라이드를 중앙에 배치
        loop={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        pagination={{
          type: 'fraction',
        }}
        navigation={true} // 네비게이션 버튼 활성화
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link to={'/product'}><img src={giftpoint} alt='mainImage1'/></Link>
        </SwiperSlide>
        <SwiperSlide>
          <img src={attendance} alt='mainImage3'/>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/attendance'}><img src={giftpoint} alt='mainImage2'/></Link>
        </SwiperSlide>
        <SwiperSlide>
          <img src={attendance} alt='mainImage4'/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Swipter;
