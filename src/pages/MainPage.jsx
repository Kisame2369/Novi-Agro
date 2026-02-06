import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-fade";

import css from "./MainPage.module.css";

export default function MainPage() {
    return (
        <div className={css.sliderContainer}>
            <Swiper
                modules={[Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={2000}
                loop={true}
                autoplay={{ 
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false
                }}
                allowTouchMove={false}
                className={css.mySwiper}
            >
                <SwiperSlide>
                    <img src="/images/slider3.jpg" alt="Slider 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slider7.png" alt="Slider 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slider5.jpg" alt="Slider 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slider4.jpg" alt="Slider 4" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slider6.jpg" alt="Slider 5" />
                </SwiperSlide>
            </Swiper>
            
            <div className={css.overlay}>
                <h1>Quality feed - Healthy life</h1>
                <p>The best feed for your animals</p>
                <NavLink
                        to="/products"
                        end
                        className={css.button}
                    >
                        Our products
                    </NavLink>
            </div>
        </div>
    );
}