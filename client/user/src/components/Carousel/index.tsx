import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

interface Iprops {
    listImage: Array<string>;
}

export default function App(props: Iprops) {
    const { listImage } = props;
    return (
        <>
            <Swiper
                spaceBetween={50}
                centeredSlides={true}
                autoplay={{
                    delay: 1300,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay, Navigation]}
                className="w-80 h-80 lg:h-96 lg:w-96 xl:h-[30rem] xl:w-[34rem]"
            >
                {listImage.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} className="rounded h-full w-full object-cover object-center" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
