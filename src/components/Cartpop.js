import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-bootstrap/Modal';
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { ASSETS_BASE_URL } from "../config/constants";
import { Link } from 'react-router-dom';

const Cartpop = ({ cart }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [cartData, setCartData] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (cart) {
      setCartData(cart);
      const defaultVariants = {};
      const initialQuantities = {};

      cart.forEach(item => {
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
  }, [cart]);

  const handleVariantClick = (variantId) => {
    setSelectedVariants(prevState => ({
      ...prevState,
      [variantId]: selectedVariants[variantId]
    }));
  };

  const getItemCount = (variantId) => {
    return quantities[variantId] || 1;
  };

  const increaseQuantity = (variantId, item) => {
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

  // Inside your Cartpop component

  const decreaseQuantity = (productId, item) => {
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
      [productId]: (prevQuantities[productId] || 1) - 1
    }));
  };

  
  
  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cartData]);

  const calculateDiscountedPrice = (variantId, quantity) => {
    const selectedVariant = selectedVariants[variantId];
    if (!selectedVariant) return 0;
  
    const rate = selectedVariant.rate || 0; // This should reference the correct variant's rate
    const discount = selectedVariant.discount || 0;
  
    const discountedPrice = discount ? rate - (rate * (discount / 100)) : rate;
    return discountedPrice * quantity;
  };
  

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
console.log("uniqueProducts",uniqueProducts);
const calculateSubtotal = () => {
  return uniqueProducts.reduce((total, item) => {
    const quantity = quantities[item.varients[0]._id] || 1;
    const discountedPrice = calculateDiscountedPrice(item.varients[0]._id, quantity);
    return total + discountedPrice;
  }, 0);
};

  useEffect(() => {
    const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
    if (USER_INFO && USER_INFO.token) {
      setToken(USER_INFO.token);
    } else {
      setToken(null);
    }
    sessionStorage.removeItem("orderDataComplete");
    sessionStorage.removeItem("shopname");
    sessionStorage.removeItem("changeorderresult");
    sessionStorage.removeItem("transaction");
    sessionStorage.removeItem("chargeId");
    sessionStorage.removeItem("treat");
  }, []);

  return (
    <Modal show={show} onHide={handleClose} id="cartpop">
      <Modal.Header closeButton>
        <div>
          <div className='character_stics'>
            <p>Your Shopping Cart</p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body id="product_item">
        <div className='character_stics'>
          <p>Cart Items</p>
        </div>
        {uniqueProducts.map(item => (
  <div key={item.productData._id} className='product_item'>
    <div className='cart_view'>
      <img src={`${ASSETS_BASE_URL}${item.productData?.image}`} alt={item.productData?.name} />
    </div>
    <div className="item_info">
      <h1>{item.productData?.name}</h1>
      <div className="product_size">
        {item.varients?.map((variant, variantIndex) => (
          <p
            key={variantIndex}
            className={variant === selectedVariants[item.varients[0]._id] ? "gram_productsize" : "kilo_productsize"}
            onClick={() => handleVariantClick(item.varients[0]._id, variant)}
          >
            {variant.unit}
          </p>
        ))}
      </div>
      <div className="product_price">
        <div>
          <p className='mb-2'>
            AED {calculateDiscountedPrice(item.varients[0]._id, quantities[item.varients[0]._id] || 1).toFixed(2)}
          </p>
          {selectedVariants[item.productData?._id]?.discount > 0 && (
            <strike className="mx-0">
              AED {selectedVariants[item.varients[0]._id]?.rate * (quantities[item.varients[0]._id] || 1) || 0}
            </strike>
          )}
        </div>
        <div className='cart_plus'>
          <button className="cart_min" onClick={() => decreaseQuantity(item.productData._id, item.varients[0]._id)}>
            <LuMinus />
          </button>
          <p className='cart-item'>{quantities[item.varients[0]._id] < 10 ? `0${quantities[item.varients[0]._id]}` : quantities[item.varients[0]._id]}</p>
          <button className='cartplus' onClick={() => increaseQuantity(item.varients[0]._id, item)}>
            <GoPlus />
          </button>
        </div>
      </div>
    </div>
  </div>
))}

      </Modal.Body>

      <div className='cart_footer'>
        <div className='subtotal'>
          <p>Sub Total</p>
          <h1>AED {calculateSubtotal().toFixed(2)}</h1>
        </div>
        <div className='cartfooter'>
          <button className="checkout" onClick={handleClose}>
            <Link to="/devlivery_process">Proceed to Checkout</Link>
          </button>
          <button className='view_cart' onClick={handleClose}>
            <Link to="/devlivery_process">View Your Cart</Link>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cartpop;
