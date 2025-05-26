import React, { useEffect } from 'react'
import ProductImage from './product_details_page_components/ProductImage'
import ProductDescription from './product_details_page_components/ProductDescription'
import { useLocation } from 'react-router-dom'
import ProductsSuggestion from './product_details_page_components/ProductsSuggestion'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../reuseable/Loading'
import { fetchAPI } from '../../../Redux/features/fetchAPI/fetchSlice'
import ScrollToTopOnDataLoad from '../../reuseable/ScrollToTopOnDataLoad'


const ProductDetails = () => {
  const isLoading = useSelector(state => state.fetch_API.isLoading);
  const dispatch = useDispatch();
  const location = useLocation();
  const proData = location.state;
  useEffect(() => {
 console.log(proData)
  }, [proData])
   useEffect(() => {
      dispatch(fetchAPI());
    }, [dispatch]);
    
  
  return (
    <div className='mb-15'>
      <ScrollToTopOnDataLoad isLoading={isLoading}/>
      {isLoading && <Loading/>}
       <div className="productDetailSection w-[92%] mx-auto flex gap-[16px]
      max-md:flex-col">

        <ProductImage image={proData.thumbnail}/>

        <ProductDescription title={proData.title} price={proData.price} desc={proData.description} stock={proData.stock} warranty={proData.warrantyInformation} shipping={proData.shippingInformation}/>

      </div>
        <ProductsSuggestion category={proData.category} proData={proData}/>
    </div>
  )
}

export default ProductDetails
