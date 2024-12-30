import React, { useState, useEffect, useMemo } from "react";
import "../StoreProcess/storeProcess.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Header from "../Header";
import { useNavigate, Link } from "react-router-dom";
import { ASSETS_BASE_URL } from "../../config/constants";
import LoginAndOtp from "../Login/loginnew";

function Devlivery_process() {
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(0);
    const [cartData, setCartData] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [quantities, setQuantities] = useState({});
    const [selected, setSelected] = useState("delivery");
    const [selectedMethod, setSelectedMethod] = useState("Same Day Delivery");
    const [shippingCharge, setShippingCharge] = useState(10); // Initialize with the default shipping charge
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const handleChange = (event) => {
      const method = event.target.value;
      setSelectedMethod(method);

      // Update shipping charge based on selected delivery method
      const charge = method === "Same Day Delivery" ? 10 : 5;
      setShippingCharge(charge);
  };
    useEffect(() => {
        const storedCartData = localStorage.getItem("cart");
        if (storedCartData) {
            setCartData(JSON.parse(storedCartData));
        } else {
            console.log("No cart data found in localStorage.");
        }
    }, []);

    useEffect(() => {
        if (cartData) {
            const defaultVariants = {};
            const initialQuantities = {};

            cartData.forEach(item => {
              const productId = item?.productData?._id;

              if (productId && item?.varients?.length) {
                item.varients.forEach(variant => {
                  const variantId = variant._id;
      
                  if (!defaultVariants[variantId]) {
                    defaultVariants[variantId] = variant;
                  }
      
                  initialQuantities[variantId] = (initialQuantities[variantId] || 0) + 1;
                });
              }
            });
            setSelectedVariants(defaultVariants);
            setQuantities(initialQuantities);
        }
    }, [cartData]);

    const uniqueProducts = useMemo(() => {
      const uniqueVariantsMap = new Map();
      cartData.forEach(item => {
        item.varients.forEach(variant => {
          const variantId = variant._id;
          if (!uniqueVariantsMap.has(variantId)) {
            uniqueVariantsMap.set(variantId, { ...item, variant });
          }
        });
      });
      return [...uniqueVariantsMap.values()];
    }, [cartData]);

    // const handleIncrement = (productId) => {
    //     setQuantities(prevQuantities => ({
    //         ...prevQuantities,
    //         [productId]: (prevQuantities[productId] || 1) + 1
    //     }));
    // };
    const handleIncrement = (variantId, item) => {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [variantId]: (prevQuantities[variantId] || 1) + 1
      }));
  
      // Update localStorage
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      storedCart.push({ ...item });
      localStorage.setItem('cart', JSON.stringify(storedCart));
      window.dispatchEvent(new Event('cartUpdated'));
    };
    const handleDecrement = (productId, item) => {
      if (quantities[item] > 1) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemIndex = storedCart.findIndex(
        (cartItem) => cartItem?.productData?._id === productId && cartItem?.varients[0]._id === item
      );
  
  
      if (itemIndex !== -1) {
        // Remove the first occurrence only
        storedCart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(storedCart));
        if (window?.dispatchEvent) {
          window.dispatchEvent(new Event("cartUpdated"));
        }
      }
      
      // Save the updated cart data back to localStorage
      localStorage.setItem('cart', JSON.stringify(storedCart));
    
      // Log the cart to verify
      const storedCartdd = JSON.parse(localStorage.getItem('cart')) || [];
      if (window?.dispatchEvent) {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      // Update the local state for quantities
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [item]: (prevQuantities[item] || 1) - 1
      }));
    } else {
      // Optionally, remove the item when quantity reaches 0
      handleRemoveItem(item);
    }
    };
    
    
    // const handleDecrement = (productId, item) => {
    //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    //   const itemIndex = storedCart.findIndex(
    //     (cartItem) => cartItem?.productData?._id === productId && cartItem?.varients[0]._id === item
    //   );
  
  
    //   if (itemIndex !== -1) {
    //     // Remove the first occurrence only
    //     storedCart.splice(itemIndex, 1);
    //     localStorage.setItem("cart", JSON.stringify(storedCart));
    //     if (window?.dispatchEvent) {
    //       window.dispatchEvent(new Event("cartUpdated"));
    //     }
    //   }
      
    //   // Save the updated cart data back to localStorage
    //   localStorage.setItem('cart', JSON.stringify(storedCart));
    
    //   // Log the cart to verify
    //   const storedCartdd = JSON.parse(localStorage.getItem('cart')) || [];
    //   if (window?.dispatchEvent) {
    //     window.dispatchEvent(new Event('cartUpdated'));
    //   }
    //   setQuantities(prevQuantities => ({
    //     ...prevQuantities,
    //     [item]: (prevQuantities[item] || 1) - 1
    //   }));
    // };
    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSelect = (type) => {
        setSelected(type);
      };

    const handle_NextPage = () => {
        navigate("/deliverypersonaldetails");
    };

    const store_process = () => {
        navigate("/store-personal-deatils");
    };

    const handleVariantClick = (itemId, variant) => {
        setSelectedVariants(prevState => ({
            ...prevState,
            [itemId]: variant
        }));
    };

    const calculateDiscountedPrice = (productId, quantity) => {
        const selectedVariant = selectedVariants[productId];
        if (!selectedVariant) return 0;

        const rate = selectedVariant.rate || 0;
        const discount = selectedVariant.discount || 0;

        const discountedPrice = discount ? rate - (rate * (discount / 100)) : rate;
        return discountedPrice * quantity;
    };
    const handleRemoveItem = (productId) => {
        const updatedCartData = cartData.filter(item =>item.varients[0]._id !== productId);
        setCartData(updatedCartData);
        localStorage.setItem("cart", JSON.stringify(updatedCartData));
        if (window?.dispatchEvent) {
            window.dispatchEvent(new Event('cartUpdated'));
          }
    };
    const calculateSubtotal = () => {
      return uniqueProducts.reduce((total, item) => {
        const quantity = quantities[item.varients[0]._id] || 1;
        const discountedPrice = calculateDiscountedPrice(item.varients[0]._id, quantity);
        return total + discountedPrice;
      }, 0);
    };
      const handleOrder = () => {
        // Store all necessary data in state or local storage if needed
        const orderData = {
          orderType: selected,
          deliveryMethod: selectedMethod,
          subtotal: calculateSubtotal().toFixed(2),
          shippingCharge: shippingCharge,
          // Add other necessary data fields
        };
    
        // You can use session storage or state management for persisting across pages
        // For example, storing in session storage:
        sessionStorage.setItem("orderData", JSON.stringify(orderData));
        const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
        if (USER_INFO && USER_INFO.token) {
          navigate("/deliverypersonaldetails");
        } else {
         
          setIsModalOpen(true);
        }
        // Redirect to the delivery personal details page
      };
     
    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5 py-3">
                    <div className="col-md-9">
                        <div className="store_process_card_name">
                            <span className="font-weight-bold">Cart Items</span>
                        </div>
                        {uniqueProducts.map(item => (
                            <div
                                key={item.productData._id}
                                className="row align-items-center py-2 store_process_product_imge_div"
                            >
                                <div className="col-2 col-sm-2 col-md-2 store_process_product_imge">
                                    <img
                                        src={`${ASSETS_BASE_URL}${item.productData?.image}`}
                                        alt="Product"
                                        className="img-fluid product-image"
                                    />
                                </div>
                                <div className="col-10 col-sm-10 col-md-10">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div>
                                                <div className="flex items-center justify-center">
                                                    {[...Array(5)].map((_, index) => (
                                                        <svg
                                                            key={index}
                                                            onClick={() => handleRating(index + 1)}
                                                            className={`w-8 h-8 cursor-pointer store_process_rating ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    ))}
                                                    <span className="store_process_rating_no">{rating}</span>
                                                </div>
                                            </div>
                                            <span className="store_process_predigree">
                                                {item.productData?.name}
                                            </span>
                                            <div className="store_process_for_kg_main_div">
                                                {item.varients?.map((variant, variantIndex) => (
                                                    <span
                                                        key={variantIndex}
                                                        className={variant === selectedVariants[item.varients[0]._id]
                                                            ? "store_process_for_g"
                                                            : "store_process_for_kg"
                                                        }
                                                        onClick={() => handleVariantClick(item.productData?._id, variant)}
                                                    >
                                                        {variant.unit}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="store_process_aed">
                                                <span className="store_process_predigree">
                                                AED {calculateDiscountedPrice(item.varients[0]._id, quantities[item.varients[0]._id] || 1).toFixed(2)}
                                                </span>
                                                {selectedVariants[item.productData?._id]?.discount > 0 && (
                                                    <span className="text-muted ml-2 text-decoration-line-through store_process_predigree_aed">
                                                         AED {selectedVariants[item.varients[0]._id]?.rate * (quantities[item.varients[0]._id] || 1) || 0}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-end store_process_last_btn_section">
                                            <div className="store_process_trash_button">
                                            <button type="button" onClick={() => handleRemoveItem(item.varients[0]._id)}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <div className="btn-group rounded store_btn_group_for_increment_decrement">
                                                    <button type="button" onClick={() => handleDecrement(item.productData._id, item.varients[0]._id)}>
                                                        -
                                                    </button>
                                                    <div className="px-3 d-flex align-items-center">
                                                         {/* {quantities[item.varients[0]._id] || 1}  */}
                                                         {quantities[item.varients[0]._id] < 10 ? `0${quantities[item.varients[0]._id]}` : quantities[item.varients[0]._id]}

                                                    </div>
                                                    <button type="button" onClick={() => handleIncrement(item.varients[0]._id, item)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3">
      <div className="store_process_card_name">
        <span className="font-weight-bold">Payment Details</span>
      </div>
      <div className="form-group">
        <div className="mt-2 store_process_type_order__section">
          <h6>Select Order Type</h6>
          <div className="card-deck store_process_select_order">
            <div
              className={`card mb-3 store_delivery_border ${
                selected === "delivery" ? "border-danger" : ""
              }`}
              onClick={() => handleSelect("delivery")}
            >
              <div className="card-body d-flex align-items-center store_process_order_type">
                <div className="icon-container">
                  <span
                    role="img"
                    aria-label="delivery"
                    className="store_location_and_delivery"
                  >
                    <img src="/frisbeeImage/store_delivery.png" alt="" />
                  </span>
                </div>
                <div
                  className="ml-3 store_process_delivery"
                  onClick={handleOrder}
                >
                  <h6
                    className={`mb-0 ${
                      selected === "delivery" ? "text-danger" : ""
                    }`}
                  >
                    Delivery
                  </h6>
                  <small className="text-muted">(Home Delivery)</small>
                </div>
              </div>
            </div>
            <div className="payment-methods p-3 store_process_wallet_section">
              {["Same Day Delivery", "Next Day Delivery"].map((method, index) => (
                <div className="form-check store_process_radio_section" key={index}>
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    name="paymentMethod"
                    id={`paymentMethod ${index}`}
                    value={method}
                    checked={selectedMethod === method}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`paymentMethod ${index}`}>
                    {method}
                  </label>
                </div>
              ))}
            </div>
            <div
              className={`card store_delivery_border ${
                selected === "instore" ? "border-danger" : ""
              }`}
              onClick={() => handleSelect("instore")}
            >
              <div className="card-body d-flex align-items-center store_process_order_type">
                <div className="icon-container">
                  <span
                    role="img"
                    aria-label="instore"
                    className="store_location_and_delivery"
                  >
                    <img src="/frisbeeImage/store_location.png" alt="" />
                  </span>
                </div>
                <div
                  className="ml-3 store_process_delivery"
                  onClick={handleOrder}
                >
                  <h6
                    className={`mb-0 ${
                      selected === "instore" ? "text-danger" : ""
                    }`}
                  >
                    Instore
                  </h6>
                  <small className="text-muted">(Click & Collect)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payment-details store_process_payement_deatils_heading mt-2">
        <h6>Payment Details</h6>
        <div className="store_process_payment_details_heading_child_div">
          <table className="table bg-light">
            <tbody>
              <tr>
                <td>Detail</td>
                <td className="text-end">Price</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td className="text-end">{calculateSubtotal().toFixed(2)} AED</td>
              </tr>
              <tr>
                <td>Total</td>
                <td className="text-end">AED {calculateSubtotal().toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping Charge</td>
                <td className="text-end">{shippingCharge} AED</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
          <div className="col">Amount Due</div>
          <div className="col text-end">AED {(calculateSubtotal() + parseFloat(shippingCharge)).toFixed(2)}</div>
        </div>
        <div className="login_user_otp_for_bottom_button">
          <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={handleOrder}>
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
                </div>
            </div>
            <LoginAndOtp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
}

export default Devlivery_process;
