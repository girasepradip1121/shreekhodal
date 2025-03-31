import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider1 from "../Images/Slider1.png" 
import Slider2 from "../Images/Slider2.jpg" 
import Slider3 from "../Images/Slider3.jpg" 
import Slider4 from "../Images/Slider4.jpg" 
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const slides = [
  { id: 1, image:Slider1, text: "Discover the Perfect Jewellery", text1:'Unlock your style potential and unearth the perfect pieces that define your unique elegance', btntext:'Find More' },
  { id: 2, image:Slider2, text: "The Luxury Queen of Heart", text1:'Light up the room with the best collection', btntext:'Find More'},
  { id: 3, image:Slider3, text: "Royal Elegent Kundan Collection",  text1:'Look pretty rasily with our best prices', btntext:'Find More'},
  { id: 3, image:Slider4, text: "Royal Elegent Kundan Collection",  text1:'Look pretty rasily with our best prices', btntext:'Find More'},
];

export default function Slider() {
  const navigate = useNavigate();
  return (
    <div className="md:h-[100vh] md:mt-15 mt-28 w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {slides?.map((slide) => (
            <SwiperSlide  key={slide.id}  className="relative flex items-center justify-center h-full">
              {/* Background Image */}
              <img  src={slide.image}  alt=""  className= "md:object-cover object-contain w-full"/>
              {/* Overlay Text */}
              <div className="absolute flex-col inset-0 flex items-center  justify-center ml-5 mr-5" >
                <p className="text-white md:text-6xl text-2xl font-bold md:leading-20 leading-10" style={{fontFamily:'EB Garamond'}}>{slide.text}</p>
                <p className="text-white md:text-2xl text-sl font-[200] md:leading-20 font-[Inter] leading-10 ">{slide.text1}</p>
                <button className="border-2 text-white p-2  md:w-100 font-[Lato] cursor-pointer" onClick={()=>{navigate('/category')}}><i className="fa-solid fa-star md:mr-20 mr-5"></i>{slide.btntext}<i className=" ml-5 fa-solid fa-star md:ml-20"></i></button>
              </div>
            </SwiperSlide>
          ))}

      </Swiper>
    </div>
  );
}

