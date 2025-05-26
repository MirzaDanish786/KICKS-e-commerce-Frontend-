import DropDownBtn from "./listing_page_components/FilterDropDown";
import Filter from "./listing_page_components/Filter";
import TrendingDropDown from "./listing_page_components/TrendingDropDown";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../../Redux/features/fetchAPI/fetchSlice";
import Card from "../../reuseable/Card";
import Loading from "../../reuseable/Loading";
import ReactPaginate from "react-paginate";
import "../../../../src/App.css";
import { ReactComponent as PrevIcon } from "../../../assets/icons/prevIcon.svg";
import { ReactComponent as NextIcon } from "../../../assets/icons/nextIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToTopOnDataLoaded from "../../reuseable/ScrollToTopOnDataLoad";

const Listing = () => {
  const navigate = useNavigate();
  const [isTrending, setIsTrending] = useState(false);
  const isLoading = useSelector((state) => state.fetch_API.isLoading);
  const products = useSelector((state) => state.fetch_API.products);
  const selectedCategories = useSelector(
    (state) => state.fetch_API.selectedCategories
  );
  const location = useLocation();
  const initialNewDropRating = location.state?.newDropRating || 0; 

  const [newDropRating, setNewDropRating] = useState(initialNewDropRating); // Local state for newDropRating
  const selectedRating = useSelector((state) => state.fetch_API.selectedRating);

  // States for responsive design:
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // State of object that passes to the details page:
  const [productDetails, setProductDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSelectedRating =
      selectedRating === 0 || // No filtering if selectedRating is 0
      (product.reviews &&
        product.reviews[0] &&
        product.reviews[0].rating >= selectedRating);

    const matchesNewDropRating =
      newDropRating === 0 || // No filtering if newDropRating is 0
      (product.reviews &&
        product.reviews[0] &&
        product.reviews[0].rating >= newDropRating);

    // Apply newDropRating only if it's not reset
    if (newDropRating > 0) {
      return matchesCategory && matchesNewDropRating;
    }

    // Otherwise, apply the other filters
    return matchesCategory && matchesSelectedRating;
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategories, selectedRating, products]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAPI());
  }, [dispatch]);

  const handleTrendingDropDownClick = () => {
    setIsTrending((prev) => !prev);
  };

  // Reset newDropRating when user interacts with filters
  useEffect(() => {
    if (selectedCategories.length > 0 || selectedRating > 0) {
      setNewDropRating(0); // Clear newDropRating
    }
  }, [selectedCategories, selectedRating]);

  // Handle page range props to make responsive:
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageRangeDisplayed(2);
        setItemsPerPage(8);
      } else {
        setPageRangeDisplayed(4);
        setItemsPerPage(9);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const handleScroll = () => {
    window.scrollTo(0,0);
  }
  // Navigate and send the state of obj to the product details page and Function to assign the data of the product:
  const handleProductDetailsClick = (proData) => {
    navigate("/product_details", { state: proData });
    handleScroll();
  };

  

  return (
    <div className="w-[92%] mx-auto flex flex-col gap-16 mb-20 max-md:gap-6">
      <ScrollToTopOnDataLoaded isLoading={isLoading}/>
      {isLoading && <Loading />}

      <div className="ourProductsUpper flex justify-between items-center">
        <div>
          <div className="font-semibold text-[36px] max-sm:text-2xl">
            Our Products
          </div>
          <div className="productsCount font-semibold text-[16px] text-[#232321] opacity-[80%]">
            {filteredProducts.length} items
          </div>
        </div>
        <div className="relative max-md:hidden">
          <TrendingDropDown
            onClick={handleTrendingDropDownClick}
            isDropDown={isTrending}
          />
        </div>
      </div>

      <div className="flex gap-4 max-md:flex-col max-md:h-auto">
        {/* Filter Container */}
        <div className="categoryFilter w-[25%] flex flex-col gap-6 max-md:flex-row max-md:w-full max-md:justify-between max-md:sticky max-md:top-0 z-30 max-md:bg-gray-200 max-md:py-3">
          <Filter />
        </div>

        {/* Grid Container */}
        <div className="categoryListGrid w-[75%] grid grid-cols-3 gap-[16px] overflow-auto max-h-fit custom-scrollbar max-md:grid-cols-2 max-md:w-full">
          {/* Cards are dynamically displayed here */}
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div key={product.id}>
                <Card
                  image={product.thumbnail}
                  title={product.title}
                  price={product.price}
                  onClick={() => {
                    handleProductDetailsClick(product);
                  }}
                />
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>

      {/* Pagination Component */}
      <div className="pagination-container flex justify-end">
        <ReactPaginate
          previousLabel={
            <div className="flex items-center gap-1 font-medium text-sm" onClick={handleScroll}>
              <div>
                <PrevIcon />
              </div>
              <div className="h-full max-md:hidden">PREVIOUS</div>
            </div>
          }
          nextLabel={
            <div className="flex items-center gap-1.5 font-medium text-sm" onClick={handleScroll}>
              <div className="h-full max-md:hidden"> NEXT</div>
              <div>
                <NextIcon />
              </div>
            </div>
          }
          pageCount={pageCount}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"prev"}
          nextClassName={"next"}
          pageClassName={"page"}
          breakLabel={"..."}
          marginPagesDisplayed={1}
          pageRangeDisplayed={pageRangeDisplayed}
        />
      </div>
    </div>
  );
};

export default Listing;

