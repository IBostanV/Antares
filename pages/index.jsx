import React, {useEffect, useState} from 'react';
import {hasCookie} from 'cookies-next';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, FreeMode, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {getAllCategories} from '../api/category';
import {useRouter} from 'next/router';
import {Card} from 'react-bootstrap';
import base64Util from '../utils/base64Util';
import {useTranslation} from "react-i18next";

function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => await getAllCategories();
    fetchCategories().then(setCategories);
  }, []);

  const selectCategory = (categoryId) => {
    router.push(`/quiz/categorized/${categoryId}`).then(console.log);
  };

  return (
      <div>
        <h4>{t('popular_categories')}</h4>
        <Swiper
            loop
            freeMode={true}
            slidesPerView={6}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            onSwiper={(swiper) => (window.swiper = swiper)}
            mousewheel={{
              forceToAxis: false,
              sensitivity: 1,
              releaseOnEdges: true
            }}
            modules={[Pagination, Mousewheel, Navigation, Scrollbar, Keyboard, Autoplay, FreeMode]}
        >
          {categories?.map(category => (
              <SwiperSlide
                  className="cursor-pointer"
                  key={category.catId}
                  onClick={() => selectCategory(category.catId)}
              >
                <Card>
                  <Card.Img variant="top" src={base64Util(category.attachment)}/>
                  <Card.ImgOverlay>
                    <Card.Text><span className="h2 text-shadow">{category.name}</span></Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
}

export const getServerSideProps = async ({
  req,
  res
}) => ({
  props: {
    isLoggedIn: hasCookie('authorization', {
      req,
      res
    }),
  },
});

export default Home;
