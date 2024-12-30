import React, { useState, useEffect } from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Productslider from "./Productslider";
import { product_pic, icon_first, icon_second, icon_third } from "../../../components/Images";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { shopproductList } from "../../../controllers/store/shopController";
import Frequentelyslider from "./Frequentelyslider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./productslider.css";

const Productdetail = () => {
    const location = useLocation();
    const item = location.state?.item;
    const [ShopListData, setShopList] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // const handleAddToCart = (product) => {
    //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     cart.push(product);
    //     localStorage.setItem('cart', JSON.stringify(cart));
      
    //     // Show toast notification
    //     toast.success("Product added to cart!", {
    //         position: "top-right",
    //     });
      
    //     // Update the cart count in the header (if the header component listens to cart updates)
    //     if (window?.dispatchEvent) {
    //       window.dispatchEvent(new Event('cartUpdated'));
    //     }
    //   };

    
    const ShopProductdetailList = async () => {
        setShopList([]);
        try {
            const options = {
                type: "single",
                condition: {
                    _id: item._id,
                },
                select: {},
                sort: { "_id": -1 },
                page: "1",
            };
            const listData = await shopproductList(options);
            if (listData?.status === true) {
                setShopList([listData.result]); // Wrap the result in an array
            }
        } catch (error) {
            console.log("Failed to fetch shop list: ", error);
        }
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
    };
    const handleAddToCart = (product) => {
        // Ensure a variant is selected before adding to the cart
        if (!selectedVariant) {
            toast.error("Please select a variant before adding to the cart", {
                position: "top-right",
            });
            return; // Exit if no variant is selected
        }
    
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Filter the cart items based on the store ID
        const updatedCart = cart.filter(item => item.store._id === product.store._id);
    
        updatedCart.push({
            ...product,
            varients: [selectedVariant], // Include only the selected variant
        });
    
        // Show toast notification
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
        document.title = "Frisbee website || Shop store list";
    }, [item]);

    // Check if ShopListData has data before accessing its properties
    const productData = ShopListData.length > 0 ? ShopListData[0]?.productData : null;
    const productDataall = ShopListData.length > 0 ? ShopListData[0]?.varients : [];

    // Set the initial selected variant to the first variant in the list
    useEffect(() => {
        if (productDataall.length > 0) {
            setSelectedVariant(productDataall[0]);
        }
    }, [productDataall]);
    const getDiscountedPrice = (rate, discount) => {
        if (discount) {
            return rate - (rate * discount / 100);
        }
        return rate;
    };
    return (
        <>
            <Header />
            <div className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    {productData && <Productslider image={productData.image} />}
                                </div>
                                <div className="col-md-6">
                                    <div className="grooming_board">
                                        <div className="grooming_board_productcard">
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
                                            <h1>{productData?.name}</h1>
                                            <div className="product_size">
                                                {productDataall.map((variant, variantIndex) => (
                                                    <p 
                                                        key={variantIndex}
                                                        className={
                                                            variant === selectedVariant
                                                                ? "gram_productsize"
                                                                : "kilo_productsize"
                                                        }
                                                        onClick={() => handleVariantClick(variant)}
                                                    >
                                                        {variant.unit}
                                                    </p>
                                                ))}

                                                
                                            </div>
                                            <div className="product_price">
                                            <p>AED {getDiscountedPrice(selectedVariant?.rate, selectedVariant?.discount)}</p> {/* Display price of selected variant */}
                                            {selectedVariant?.discount > 0 && (
                                                    <strike>AED {selectedVariant?.rate}</strike> 
                                                )}
                                            </div>
                                            <button onClick={() => handleAddToCart(ShopListData[0])}>Add To Cart</button>
                                            <div>
                                                <ul className="dogdetails_info">
                                                    <li>
                                                        <div>
                                                            <img src={icon_first} alt="icon_first" />
                                                        </div>
                                                        <div className="doginfo_dtailsinnersection">
                                                            <p>Breed</p>
                                                            <h1>Husky</h1>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <img src={icon_second} alt="icon_second" />
                                                        </div>
                                                        <div>
                                                            <p>Age</p>
                                                            <h1>1 Year 5 Months</h1>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <img src={icon_third} alt="icon_third" />
                                                        </div>
                                                        <div>
                                                            <p>Gender</p>
                                                            <h1>Male</h1>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <p>Description</p>
                                                <p>
                                                   {productData?.details} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="frequenelty my-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 grooming_info">
                                <div className="features_grooming">
                                    <h1 className="main_heading"> <span>Frequently Bought </span>Together</h1>
                                    <p className="sub_heading">It is a long established fact that a reader will be distracted by the readable content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frequentlyslider mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <Frequentelyslider item={item}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <ToastContainer /> {/* Add ToastContainer for showing toasts */}
        </>
    );
};

export default Productdetail;
