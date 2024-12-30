import React, { useState,useEffect } from 'react';
import Shop_Categories from "./Shop_Categories";
import { Link,useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {shopproductList} from "../../../controllers/store/shopController";
import './shopproduct_list.css';
// import { dog_listone ,product_pic} from "../components/Images";
import { FaStar, FaRegStarHalfStroke, FaLocationDot } from "react-icons/fa6";
import RatingsStar from "../../../components/RatingsStar";
import {ASSETS_BASE_URL} from "../../../config/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./productslider.css";

const Shop_productlisting = () => {
  const location = useLocation();
  const item = location.state?.item;
  const [selectedVariants, setSelectedVariants] = useState({});
  const categoryId = location.state?.categoryId;
  const [ShopListData, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedCategorydetail, setSelectedCategorydetail] = useState(null);
  const workingDays = item?.storeData?.store_time?.filter(day => day.status === 'Open') || [];
  const workingDaysLength = workingDays.length;
  const formattedWorkingDays = workingDays.map(day => {
    const formattedDay = day.day.charAt(0).toUpperCase() + day.day.slice(1, 3).toLowerCase(); // Capitalize the first letter and shorten the day to 3 characters
    return formattedDay;
}).join(', ');
const earliestOpenTime = workingDays.reduce((earliest, day) => day.open_time < earliest ? day.open_time : earliest, workingDays[0]?.open_time);
const latestCloseTime = workingDays.reduce((latest, day) => day.close_time > latest ? day.close_time : latest, workingDays[0]?.close_time);

// Function to convert 24-hour time to 12-hour AM/PM format
const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Convert hour to 12-hour format, 0 is converted to 12
    return `${formattedHour}:${minute} ${period}`;
};

// Create the formatted working hours string
const workingHours = `${formatTime(earliestOpenTime)} - ${formatTime(latestCloseTime)}`;

const handleCategorySelect = (categoryId) => {
  setSelectedCategoryId(categoryId.category._id);
  setSelectedCategoryName(categoryId.category.name);
  setSelectedCategorydetail(categoryId.category.details);
  ShopProductList();
}; 
const handleAddToCart = (product) => {
  const selectedVariant = selectedVariants[product._id]; // Get the selected variant for this product
  
  // Ensure a variant is selected before adding to the cart
  if (!selectedVariant) {
    toast.error("Please select a variant before adding to the cart", {
      position: "top-right",
    });
    return; // Exit if no variant is selected
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updatedCart = cart.filter(item => item.store._id === product.store._id);

    updatedCart.push({
      ...product,
      varients: [selectedVariant], // Include only the selected variant
    });
    toast.success("Product added to cart!", {
      position: "top-right",
    });
  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Trigger the cart update event if applicable
  if (window?.dispatchEvent) {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};



// const handleAddToCart = (product) => {
//   // const selectedVariant = selectedVariants[product._id];
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const updatedCart = cart.filter(item => item.store._id === product.store._id);
//   updatedCart.push(product);

//   localStorage.setItem('cart', JSON.stringify(updatedCart));
//   // localStorage.setItem('selectedVariant', JSON.stringify(selectedVariant));

//   toast.success("Product added to cart!", {
//     position: "top-right",
//   });

//   if (window?.dispatchEvent) {
//     window.dispatchEvent(new Event('cartUpdated'));
//   }
// };

const ShopProductList = async () => {
  setShopList([]);
  setIsLoading(true);
  try {
      const options = {
          type: "",
          condition: {
            vendorData: item.vendorData,
            store : item.storeData._id,
            branch : item._id
          },
          category: selectedCategoryId,
           select: {},
          sort: { "_id": -1 }, 
          page: currentPage,

      }
      const listData = await shopproductList(options);
      if (listData?.status === true) {
          setShopList(listData.result);
          const initialSelectedVariants = {};
          listData.result.forEach(product => {
            if (product.varients.length > 0) {
              initialSelectedVariants[product._id] = product.varients[0];
            }
          });
          setSelectedVariants(initialSelectedVariants);
      }
  } catch (error) {
      console.log("Failed to fetch groomoing shop list: ", error)
  }
}
const handleVariantClick = (itemId, variant) => {
    setSelectedVariants(prevState => ({
      ...prevState,
      [itemId]: variant
    }));
  };
useEffect(() => {
    // Fetch initial category data or set the first category as selected by default
    if (categoryId && categoryId.category) {
      setSelectedCategoryId(categoryId.category._id);
      setSelectedCategoryName(categoryId.category.name);
      setSelectedCategorydetail(categoryId.category.details);
      ShopProductList();
    }
  
    document.title = "Frisbee website || Shop store list";
  }, [currentPage, categoryId]);
  const getDiscountedPrice = (rate, discount) => {
    if (discount) {
        return rate - (rate * discount / 100);
    }
    return rate;
};
    return (
        <>
            <Header></Header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="adoption_info">
                        <div className="container mt-5">
                    <div className="row my-4">
                        <div className="col-md-2 px-0">
                            <div className="pet_avenue">
                                <img src={`${ASSETS_BASE_URL}${item?.storeData?.image}`} alt={item?.name} width={`100px`} />
                                <p>20% OFF</p>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="rightside_list">
                                <div className="add_review">
                                    <RatingsStar rating={item?.ratings} />
                                </div>
                                <h1>{item?.storeData?.shop_name}</h1>
                                <p className="mx-0">{item?.title}</p>
                                <div>
                                    <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <FaLocationDot id="location" />
                                    </Link>
                                        {item?.address}</p>
                                        <p className="mx-0"><span className="shop_info">Working Days : </span> {workingDaysLength} Days ({formattedWorkingDays})</p>
                                        <p className="mx-0"><span className="shop_info">Working Hours : </span>  {workingHours}</p>
                                  </div>
                            </div>
                        </div>
                        <div className="col-md-2 px-0">
                            <button className="textend"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer">Get Direction</Link></button>
                        </div>
                        <div className="col-md-12 px-0">
                            <h1>Description</h1>
                            <p>{item?.storeData?.short_details}</p>
                        </div>
                        
                    </div>
                </div>

                        </div>

                    </div>

                    <div className="col-md-3">
                        <Shop_Categories onCategorySelect={handleCategorySelect}></Shop_Categories>
                    </div>
                    <div className="col-md-9 grooming_info" id="clothing_page">
                        <div className="features_grooming ">
                            <h1 className="main_heading" >   <span>{selectedCategoryName} </span> Shop</h1>
                            <p className="sub_heading" >{selectedCategorydetail}</p>
                        </div>

                        <div className="row">
                        {ShopListData.length > 0 ? (
                                ShopListData.map((item, index) => (
                            <div className="col-md-4">
                                  <div className="grooming_board">
                                    <div className="grooming_board_productcard">
                                    {/* <Link to={`/shop/productDetail`} state={{ item}}> */}
                                    <Link to={`/shop/productDetail/${item.productData.slug}`} state={{ item }}>
                                    <div className="img_container">
                                     <img src={`${ASSETS_BASE_URL}${item.productData.image}`} alt="product_img"  width={`100px`}/> 
                                    </div>
                                    </Link>
                                  
                                    <div className="add_review">
                                                <ul>
                                                    <li><FaStar /></li>
                                                    <li><FaStar /></li>
                                                    <li><FaStar /></li>
                                                    <li><FaStar /></li>
                                                    <li><FaRegStarHalfStroke /></li>

                                                </ul>
                                                <span>4.2</span>
                                            </div>
                                            <h1>{item.productData.name}</h1>
                                              <div className="product_size">
                                            
                                              {item.varients.map((variant, variantIndex) => (
                                                   <p
                                                   key={variantIndex}
                                                   className={
                                                     variant === selectedVariants[item._id]
                                                       ? "gram_productsize"
                                                       : "kilo_productsize"
                                                   }
                                                   onClick={() => handleVariantClick(item._id, variant)}
                                                 >
                                                   {variant.unit}
                                                 </p>
                                                ))}
                                              </div>
                                              <div className="product_price">
                                              
                                              <p>AED {getDiscountedPrice(selectedVariants[item._id]?.rate, selectedVariants[item._id]?.discount)}</p> {/* Display price of selected variant */}
                                              {selectedVariants[item._id]?.discount > 0 && (
                                                <strike>AED {selectedVariants[item._id]?.rate}</strike> 
                                              )}
                                                
                                              </div>
                                              <button onClick={() => handleAddToCart(item)}>Add To Cart</button>
                                            </div>
                                  </div>
                            </div>
                                                            ))
                                                          ) : (
                                                              <p>No Products Available</p>
                                                          )}

                        </div>
                    </div>



                </div>
            </div>

            <Footer></Footer>
            <ToastContainer /> 
        </>
    )
}
export default Shop_productlisting;