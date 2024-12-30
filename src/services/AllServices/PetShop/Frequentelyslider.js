import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { shopproductfrequentlyList } from "../../../controllers/store/shopController";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./productslider.css";
const Frequentelyslider = ({ item }) => {
  const [ShopListData, setShopList] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

  const ShopProductdetailList = async () => {
    setShopList([]);
    try {
      const options = {
        storeId: item.store._id
      };
      const listData = await shopproductfrequentlyList(options);
      if (listData?.status === true) {
        setShopList(listData.result);
        // Initialize selected variants for each item
        const initialSelectedVariants = {};
        listData.result.forEach(product => {
          if (product.varients.length > 0) {
            initialSelectedVariants[product._id] = product.varients[0];
          }
        });
        setSelectedVariants(initialSelectedVariants);
      }
    } catch (error) {
      console.log("Failed to fetch shop list: ", error);
    }
  };

  const handleVariantClick = (itemId, variant) => {
    setSelectedVariants(prevState => ({
      ...prevState,
      [itemId]: variant
    }));
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
  useEffect(() => {
    ShopProductdetailList();
  }, [item]);

  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    Margin: '10',
    Padding: '10',
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  const getDiscountedPrice = (rate, discount) => {
    if (discount) {
        return rate - (rate * discount / 100);
    }
    return rate;
};
  return (
    <>
      <Slider {...settings}>
        {ShopListData.length > 0 ? (
          ShopListData.map((product, index) => (
            <div className="slide-item" key={index}>
              <div className="grooming_board">
                <div className="grooming_board_productcard">
                  <div className="img_container">
                    <img src={`${ASSETS_BASE_URL}${product.productData.image}`} alt="product_img" /> 
                  </div>
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
                  <h1>{product.productData.name}</h1>
                  <div className="product_size">
                    {product.varients.map((variant, variantIndex) => (
                      <p
                        key={variantIndex}
                        className={
                          variant === selectedVariants[product._id]
                            ? "gram_productsize"
                            : "kilo_productsize"
                        }
                        onClick={() => handleVariantClick(product._id, variant)}
                      >
                        {variant.unit}
                      </p>
                    ))}
                  </div>
                  <div className="product_price">
                    <p>AED {getDiscountedPrice(selectedVariants[product._id]?.rate, selectedVariants[product._id]?.discount)}</p> {/* Display price of selected variant */}
                    {selectedVariants[product._id]?.discount > 0 && (
                      <strike>AED {selectedVariants[product._id]?.rate}</strike> 
                     )}
                      
                  </div>
                  <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}


      </Slider>
      <ToastContainer /> 
    </>
  );
};

export default Frequentelyslider;
