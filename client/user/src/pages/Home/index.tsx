import Button from '@mui/material/Button';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CATE1 from '../../assets/img/home-page/cate-1.png';
import CATE2 from '../../assets/img/home-page/cate-2.png';
import CATE3 from '../../assets/img/home-page/cate-3.png';
import CAROUSEL1 from '../../assets/img/home-page/carousel-1.png';
import CAROUSEL2 from '../../assets/img/home-page/carousel-2.png';
import CAROUSEL3 from '../../assets/img/home-page/carousel-3.png';
import CAROUSEL4 from '../../assets/img/home-page/carousel-4.png';
import CAROUSEL5 from '../../assets/img/home-page/carousel-5.png';
import CAROUSEL6 from '../../assets/img/home-page/carousel-6.png';
import CAROUSEL7 from '../../assets/img/home-page/carousel-7.png';
import CAROUSEL8 from '../../assets/img/home-page/carousel-8.png';
import VIDEOBANNER from '../../assets/img/home-page/video-banner.mp4';

import config from '../../config';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';
import Carousel from '../../components/Carousel';

function Home() {
    const { t } = useTranslation('home');
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.play();

            const handleVideoEnded = () => {
                video.play();
            };

            video.addEventListener('ended', handleVideoEnded);

            return () => {
                video.removeEventListener('ended', handleVideoEnded);
            };
        }
    }, []);

    return (
        <>
            <div className="w-full h-full py-80 bg-homepage-banner bg-cover bg-no-repeat bg-center relative bg-fixed scroll-smooth">
                <AnimationTransform
                    className="absolute top-16 right-0 sm:top-20 sm:right-20 md:top-18 md:right-40"
                    TransX={{ to: -100, from: 0 }}
                >
                    <div className="w-[30rem] h-[33rem] bg-transparent border-2 border-primary-400 rounded-tl-[10rem] rounded-br-[10rem]"></div>
                </AnimationTransform>
                <AnimationTransform
                    className="absolute top-12 right-2 sm:top-16 sm:right-24 md:top-16 md:right-44"
                    TransX={{ to: 100, from: 0 }}
                >
                    <div className="w-[30rem] h-[33rem] bg-primary-200 dark:bg-primary-600 rounded-tl-[10rem] rounded-br-[10rem]">
                        <div className="px-14 py-24 flex flex-col gap-8 justify-center ">
                            <div className="text-sm font-semibold tracking-widest">{t('newArrival')}</div>
                            <div className="text-5xl font-bold text-primary-400 dark:text-primary-300 leading-tight">
                                {t('bannerTitle')}
                            </div>
                            <div className="font-medium">{t('bannerDescription')}</div>
                            <Link to={config.Routes.shop}>
                                <Button variant="contained" size="large" className="!w-fit !px-10">
                                    {t('buyNow')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </AnimationTransform>
            </div>

            <div className="mt-10 w-10/12 flex flex-col justify-center m-auto">
                <div className="w-full flex flex-col justify-center items-center gap-1 mb-1">
                    <div className="bg-black h-1 w-3/12"></div>
                    <div className="uppercase text-xl font-semibold not-italic">{t('diverseStyles')}</div>
                </div>
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <AnimationTransform
                        className="col-span-1 hover:scale-105 duration-200"
                        TransY={{ to: -150, from: 0 }}
                    >
                        <img src={CATE1} alt={CATE1} className="w-full h-full object-cover rounded-xl" />
                    </AnimationTransform>
                    <AnimationScale className="col-span-1 hover:scale-105 duration-200" Scale={{ to: 0.7, from: 1 }}>
                        <img src={CATE2} alt={CATE2} className="w-full h-full object-cover rounded-xl" />
                    </AnimationScale>
                    <AnimationTransform
                        className="col-span-1 hover:scale-105 duration-200"
                        TransY={{ to: 150, from: 0 }}
                    >
                        <img src={CATE3} alt={CATE3} className="w-full h-full object-cover rounded-xl" />
                    </AnimationTransform>
                </div>
            </div>

            <div className="w-full grid justify-items-center gap-1 mt-8">
                <div className="bg-black h-1 w-3/12"></div>
                <div className="uppercase text-xl font-semibold not-italic">{t('popularThisWeek')}</div>
            </div>
            <div className="h-[45rem] md:h-96 lg:h-[30rem] xl:h-[35rem] w-full mt-8 bg-primary-200 dark:bg-primary-600 ">
                <div className="w-10/12 relative grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-10 m-auto">
                    <div className="flex flex-col justify-center gap-10">
                        <>
                            <AnimationTransform
                                className="col-span-1 flex flex-col justify-center gap-6"
                                TransX={{ to: -100, from: 0 }}
                            >
                                <div className="flex flex-col gap-4 text-center md:text-left mt-16 md:mt-0">
                                    <div className="text-5xl font-bold text-primary-400 dark:text-primary-300">
                                        {t('carouselTitle')}
                                    </div>
                                    <div className="font-medium ">{t('carouselDescription')}</div>
                                </div>
                            </AnimationTransform>
                            <AnimationTransform
                                className="col-span-1 flex flex-col justify-center gap-6 text-center md:text-left"
                                TransY={{ to: 100, from: 0 }}
                            >
                                <Link to={config.Routes.shop}>
                                    <Button variant="contained" size="large" className="!w-fit !px-10">
                                        {t('exploreMore')}
                                    </Button>
                                </Link>
                            </AnimationTransform>
                        </>
                    </div>
                    <AnimationScale className="flex justify-center items-center pt-10" Scale={{ to: 0.5, from: 1 }}>
                        <Carousel
                            listImage={[
                                CAROUSEL1,
                                CAROUSEL2,
                                CAROUSEL3,
                                CAROUSEL4,
                                CAROUSEL5,
                                CAROUSEL6,
                                CAROUSEL7,
                                CAROUSEL8,
                            ]}
                        />
                    </AnimationScale>
                </div>
            </div>

            <AnimationScale className="w-full mt-8 relative " Scale={{ to: 0.5, from: 1 }}>
                <>
                    <video ref={videoRef} muted className="w-full">
                        <source src={VIDEOBANNER} type="video/mp4" />
                    </video>
                    <AnimationTransform TransY={{ to: -150, from: 0 }}>
                        <div className="w-full flex flex-col absolute bottom-0 text-center mb-10">
                            <span className="w-full h-auto mb-4 lg:text-4xl md:text-2xl text-xl font-semibold not-italic tracking-widest text-primary-900 uppercase">
                                {t('videoTitle')}
                            </span>
                            <Link to={config.Routes.shop}>
                                <Button variant="contained">{t('seeStory')}</Button>
                            </Link>
                        </div>
                    </AnimationTransform>
                </>
            </AnimationScale>
        </>
    );
}

export default Home;
