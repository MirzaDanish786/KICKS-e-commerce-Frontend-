import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css'; 
import ReviewsCard from './ReviewsCard';

const Reviews = () => {
  const reviewData = useSelector((state) => state.fetch_API.reviewsData);

  console.log(reviewData);

  return (
    <div>
      <div className="reviewsSection w-[90%] mx-auto my-[128px] max-xl:my-28 max-lg:my-14">
        <div className="reviews_Upper flex justify-between items-center mb-[48px] max-lg:mb-8">
          <div className="text-[74px] uppercase font-semibold max-xl:text-[55px] max-lg:text-[40px] max-sm:text-[35px] max-sm:normal-case">
            Reviews
          </div>
        </div>

        <div className="reviewsSectionCards_Grid">
          <Splide
            options={{
              type: 'loop',
              drag: 'free',
              focus: 'center',
              perPage: 3,
              gap: '1rem',
              autoScroll: {
                speed: 1, 
              },
              arrows: false,
              pagination: false, 
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
              },
            }}
            extensions={{ AutoScroll }}
            aria-label="Reviews Slider"
          >
            {reviewData?.nameArray?.map((name, index) => (
              <SplideSlide key={index}>
                <ReviewsCard
                  name={name}
                  review={reviewData.reviewArray[index]}
                  rating={reviewData.ratingArray[index]}
                  image={reviewData.imageArray[index]}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
