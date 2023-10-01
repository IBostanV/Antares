import React, {useEffect, useState} from 'react';
import {hasCookie} from 'cookies-next';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar} from "swiper/modules";
import {getAllCategories} from "../api/category";
import {useRouter} from "next/router";

function Home() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => await getAllCategories();

        fetchCategories().then((result) => setCategories(result));
    }, []);

    const selectCategory = (categoryId) => {
        router.push(`/quiz/categorized/${categoryId}`).then(result => console.log(result));
    }

    return (
        <div>
            <Swiper
                loop
                freeMode={true}
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{delay: 2500, disableOnInteraction: false,}}
                onSwiper={(swiper) => (window.swiper = swiper)}
                mousewheel={{forceToAxis: false, sensitivity: 1, releaseOnEdges: true}}
                modules={[Pagination, Mousewheel, Navigation, Scrollbar, Keyboard, Autoplay, FreeMode]}
            >
                {categories?.map(category => (
                    <SwiperSlide
                        role='button'
                        onClick={() => selectCategory(category.catId)}
                    >
                        {category.name}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export const getServerSideProps = async ({req, res}) => ({
    props:
        {
            isLoggedIn: hasCookie('authorization', {req, res}),
        },
});

export default Home;
