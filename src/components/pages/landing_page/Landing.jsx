import React, { useEffect } from "react";
// import HeroSection from "../HeroSection";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAPI } from "../../Redux/features/fetchAPI/fetchSlice";
// import NewDrops from "../NewDrops";
// import Category from "../Category";
import Loading from "../../reuseable/Loading";
import HeroSection from "./landing_page_components/HeroSection";
import { fetchAPI } from "../../../Redux/features/fetchAPI/fetchSlice";
import NewDrops from "./landing_page_components/NewDrops";
import Category from "./landing_page_components/Category";
import Reviews from "./landing_page_components/Reviews";
import ScrollToTopOnDataLoaded from "../../reuseable/ScrollToTopOnDataLoad";

const Landing = () => {
  document.title = 'E-commerce Site'
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.fetch_API.isLoading);
  const products = useSelector((state) => state.fetch_API.products);
  const isError = useSelector((state) => state.fetch_API.isError);
  useEffect(() => {
    dispatch(fetchAPI());
    // console.log(products)
    // console.log("Loading",isLoading)
  }, [dispatch]);
  return (
    <div>
      <ScrollToTopOnDataLoaded isLoading={isLoading}/>
      {isLoading && <Loading />}
      <HeroSection />
      <NewDrops />
      <Category />
      <Reviews/>
    </div>
  );
};

export default Landing;
