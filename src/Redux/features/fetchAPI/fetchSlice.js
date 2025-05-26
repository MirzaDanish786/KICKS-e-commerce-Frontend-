import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAPI = createAsyncThunk("fetchAPI/fetch_API", async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=200");
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

// Fetch for the Category names:
export const fetchCategoryNames = createAsyncThunk(
  "fetchCategoryNames/fetch_API",
  async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

// Fetch the First prodcut of each category:
export const fetchCategoryFirstProducts = createAsyncThunk(
  "fetchCategoryFirstProducts/fetch_API",
  async (categories) => {
    try {
      const categoriesArray = categories.map((category) =>
        axios.get(`https://dummyjson.com/products/category/${category}`)
      );
      const response = await Promise.all(categoriesArray);
      const firstProducts = response.map(
        (response) => response.data.products[0]
      );
      return firstProducts;
    } catch (e) {
      console.log(e);
    }
  }
);
const initialState = {
  isLoading: false,
  products: [],
  heroSectionProducts: [],
  isError: false,
  randomIndex: null,

  //Boolean value to handle filter screen:
  isFilterLayout: false, 

  // Data for heroSection:
  heroSectionData: {
    heroSectionProductImages: [],
    heroSectionTitle: "",
    heroSectionDesc: "",
  },
  // Data for New Drop Section:
  newDropData: null,
  // Data for Category Section:
  categoryData: {
    categoryArray: [],
    categoryImagesArray: [],
  },
  // Data for Reviews Section:
  reviewsData: {
    nameArray: [],
    reviewArray: [],
    ratingArray: [],
    imageArray: [],
  },
  // Data for Listing page:
  listingCardsData: {
    titleArray: [],
    imageArray: [],
    priceArray: [],
    availabilityStatus: [],
  },
  // Selected categries via filters array:
  selectedCategories: [],
  // Selected rating:
  selectedRating: 0,
};

export const fetchSlice = createSlice({
  name: "fetch_API",
  initialState,
  reducers: {
    PICK_RANDOM_IMAGE: (state) => {
      const random = Math.floor(
        Math.random() * state.heroSectionProducts.length
      );
      const selectedProduct = state.heroSectionProducts[random];
      state.randomIndex = random;

      state.heroSectionData.heroSectionProductImages = selectedProduct.images;
      state.heroSectionData.heroSectionTitle = selectedProduct.title;
      state.heroSectionData.heroSectionDesc = selectedProduct.description;
    },
    ToogleFilterValue:(state)=>{
       state.isFilterLayout = !state.isFilterLayout;
    },
    updateSelectedCategories:(state, action)=>{
      const category = action.payload;
      if(state.selectedCategories.includes(category)){
        state.selectedCategories = state.selectedCategories.filter(cat=> cat != category);
      }
      else{
        state.selectedCategories.push(category);
      }
      console.log(state.selectedCategories);
    },
    resetSelectedCategories:(state)=>{
      state.selectedCategories = [];
    },
    setRating:(state, action)=>{
      state.selectedRating = null;
      state.selectedRating = action.payload;
      console.log(state.selectedRating)
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;

        if (state.products.length !== 0) {
          state.heroSectionProducts = state.products.filter(
          (product) => product.images.length === 3
          );

          // Assignin the data to NewDrop data Object:
          state.newDropData = state.products
            .slice(0, 4);

          // Assigning data to reviews object:
          state.reviewsData.nameArray = state.products.map((product) =>
            product.reviews && product.reviews[0]
              ? product.reviews[0].reviewerName
              : "No Reviewer"
          );

          state.reviewsData.reviewArray = state.products.map(
            (product) => product.reviews[0].comment
          );

          state.reviewsData.ratingArray = state.products.map((product) =>
            Math.floor(product.rating)
          );

          state.reviewsData.imageArray = state.products.map(
            (product) => product.thumbnail
          );

          // Assigning data to listing page cards object:
          state.listingCardsData.titleArray =  state.products.map((product) => product.title);
          state.listingCardsData.priceArray = state.products.map(product=> product.price );
          state.listingCardsData.imageArray = state.products.map(product=> product.thumbnail);
          state.listingCardsData.availabilityStatus = state.products.map(product=> product.availabilityStatus);
        }
      })
      .addCase(fetchAPI.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Fetch categories name handling:
      .addCase(fetchCategoryNames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryData.categoryArray = action.payload;
        // console.log( state.categoryData.categoryArray)
      })
      .addCase(fetchCategoryNames.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryNames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Fetch first product images handling:
      .addCase(fetchCategoryFirstProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryFirstProducts.fulfilled, (state, action) => {
        state.categoryData.categoryImagesArray = action.payload.map(
          (product) => product.thumbnail
        );
        state.isLoading = false;
      })
      .addCase(fetchCategoryFirstProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { PICK_RANDOM_IMAGE, ToogleFilterValue, updateSelectedCategories, resetSelectedCategories, setRating } = fetchSlice.actions;
export default fetchSlice.reducer;
