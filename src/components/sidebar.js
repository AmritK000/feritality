import { Link, useNavigate, useLocation  } from 'react-router-dom';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import { list } from "../controllers/services/servicesCategory";
import { shopCategoryList } from "../controllers/store/shopController";
import {list as listfulfilment } from "../controllers/store/storeController";
import SkeltonList from "../components/SkeltonEffect/list";
import { ASSETS_BASE_URL } from "../config/constants";
import { list as promoList } from "../controllers/booking/promoCode"

const Sidebar = ({ category, onCategoryChange }) => {
    const [open, setOpen] = useState(false);
    const [slug, setSlug] = useState('');
    const [ServiceList, setServiceList] = useState([]);
    const [ShopListData, setShopList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const [shopItem, setShopId] = useState('');
    const [fulfilment, setFulmentList] = useState('');
    const [matchFulmentList, setmatchFulmentList] = useState([]);
    const [couponitems, setCouponitems] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Initialize useLocation
    
    const getList = async () => {
        setServiceList([]);
        try {
            const listData = await list();
            if (listData?.status === true) {
                setServiceList(listData.result);
                const pathName = location.pathname;
                const pathSegments = pathName.split('/').filter(Boolean).map(segment => segment.toLowerCase());

                    // Find matching categories from pathSegments
                    let matchedCategory = null;
                    for (const segment of pathSegments) {
                        matchedCategory = listData.result.find(item => item.slug === segment);
                        if (matchedCategory) {
                           
                            break; // Stop the loop when a match is found
                        }
                    }
                    trainingShopList(matchedCategory._id,matchedCategory.slug);
                    fetchPromocodeData(matchedCategory._id);
                const shopItem = listData.result.find(item => item.slug === "shop");
                if (shopItem) {
                    setShopId(shopItem._id); // Store the _id in state
                }
            }
        } catch (error) {
            console.log("Failed to fetch sidebar services categories list:", error);
        }
    };

    const serviceShopList = async () => {
        setShopList([]);
        setIsLoading(true);
        try {
            const options = {
                type: "",
                condition: { status: 'A' },
                select: {
                    name: true,
                    details: true,
                    status: true,
                    image: true
                },
                sort: { "_id": -1 },
            };
            const listData = await shopCategoryList(options);
            if (listData?.status === true) {
                setShopList(listData.result);
            }
        } catch (error) {
            console.log("Failed to fetch grooming shop list: ", error);
        }
    };

    const handleItemClick = (item) => {
        localStorage.setItem('selectedSlug', shopItem);
        localStorage.setItem('item', item);
        setActiveItem(item.name);
        navigate(`/shop/${item.name}`, { state: { itemId: item } });

        if (typeof onCategoryChange === 'function') {
            onCategoryChange(item);
        } else {
            console.warn('onCategoryChange is not a function');
        }
        
    };
        const handleserviceItemClick = (item) => {
            trainingShopList(item?._id);
        navigate(`/services/${item?.slug}`);
       
       };

    const handleshopItemClick = (item) => {
        // Navigate to the shop page with the item name in the URL
        setSlug(item.name);
        navigate("/shop", { state: { itemId: item } });
        localStorage.setItem('selectedSlug', item._id);
        if (typeof onCategoryChange === 'function') {
            onCategoryChange(item);
        } else {
            console.warn('onCategoryChange is not a function');
        }
    };


    const trainingShopList = async (_id,pathSegments) => {
        try {
            const longitude = localStorage.getItem('LONGITUDE');
            const latitude = localStorage.getItem('LATITUDE');
    
            const options = {
                type: "",
                condition: {
                    status: 'A',
                },
                filter: {
                    in_store: "N"
                },
                longitude: longitude,
                latitude: latitude,
                category: _id,  // Use the passed _id
                select: {},
                sort: { "_id": -1 },
                page: 1,
                skip: 0,
                limit: 10
            };
    
            const listData = await listfulfilment(options);
    
            // Check if there are results
            if (listData?.status === true && Array.isArray(listData.result) && listData.result.length > 0) {
                setFulmentList(listData.result[0]);
                const filteredList1 = listData.result[0]; // First item in the result
           
                let matchedData = null;

            // Loop through the keys in StoreDetails
            for (const key in filteredList1) {
                if (key.endsWith("Fulfillment")) {
                    const keyStart = key.replace("Fulfillment", "").toLowerCase(); // Remove "Fulfillment" and convert to lowercase
                   
                    if (pathSegments.includes(keyStart) && filteredList1?.[key]) {
                        matchedData = filteredList1[key];  // Store the matching data
                        break; // Break the loop once a match is found
                    }
                }
            }
            setmatchFulmentList(matchedData); 
            } else {
                console.log("No valid result found in listData");
            }
            
    
        } catch (error) {
            console.log("Failed to fetch training shop list: ", error);
        }
    };
    
    const fetchPromocodeData = async (category) => {
        try {
            const options = {
                service: category,
                type: "",
                condition: {
                    service: category,
                    status: "A"
                },
                select: {
                    title: true,
                    promocode: true,
                    discount_type: true,
                    discounts: true,
                    eligible_amount: true,
                    status: true,
                    redeem_to: true,
                    vendor: true,
                    store: true,
                    branch: true,
                    service: true
                },
                sort: { "_id": -1 },
                page: 1
            }
            const response = await promoList(options);
            if (response.status === true || response.status === 200) {
                setCouponitems(response?.result);
            }
        } catch (error) {
            console.log("Failed to fetch promoCode list:", error);
        }
    }
    
    
   

    useEffect(() => {
        getList();
        serviceShopList();

        // Update slug based on the current location path
        const pathName = location.pathname;
        if (pathName.includes('/shop')) {
            setSlug('shop'); // Set the slug to 'shop' if in shop page
        } else {
            setSlug(category);
        }
    }, [category, location.pathname]);

    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Services</Accordion.Header>
                    <Accordion.Body>
                        <ul className='services_names'>
                            {ServiceList.length > 0 ? (
                                ServiceList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li
                                            className={`${slug === item?.slug ? 'active' : ''} ${item?.slug === 'shop' && open ? 'active' : ''}`}
                                            onClick={item?.slug === 'shop' ? (e) => { e.preventDefault(); setOpen(!open); } : null} // Toggle open state for shop slug
                                        >
                                            {item?.slug === 'shop' ? (
                                                <div onClick={() => handleshopItemClick(item)} style={{ cursor: 'pointer' }}>
                                                    <span>
                                                        <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item?.name} width="100px" />
                                                    </span>
                                                    {item?.name}
                                                    
                                                </div>
                                            ) : (
                                                // <Link to={`/services/${item?.slug}`}>
                                                     <div onClick={() => handleserviceItemClick(item)} style={{ cursor: 'pointer' }}>
                                                    <span>
                                                        <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item?.name} width="100px" />
                                                    </span>
                                                    {item?.name}
                                                    </div>
                                                // </Link>
                                            )}
                                        </li>

                                        {/* Nested menu for "shop" slug */}
                                        {item?.slug === 'shop' && open && (
                                            <ul className='nested-services'>
                                                {ShopListData.length > 0 ? (ShopListData.map((item, index) => (
                                                    <li className={activeItem === item?.name ? 'active' : ''} key={index}>
                                                        <div onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                                                            <span>
                                                                <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item.name} width={`100px`} />
                                                            </span> {item?.name}
                                                        </div>
                                                    </li>
                                                ))
                                                ) : (
                                                    <SkeltonList />
                                                )}
                                            </ul>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <p>No categories available</p>
                            )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Fulfilment Type</Accordion.Header>
                    <Accordion.Body>

                    <ul className='services_names'>
                            {matchFulmentList  ? (
                                Object.entries(matchFulmentList).map(([key, value]) => (
                                    value === 'Y' && ( // Render only if the size is available
                                        <li key={key}>
                                            {/* <Link to="/"> */}
                                               
                                                {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)} {/* Display size name */}
                                            {/* </Link> */}
                                        </li>
                                    )
                                ))
                            ) : (
                                "Fulfilment Not Found"
                            )}
                        </ul>


                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Size</Accordion.Header>
                    <Accordion.Body>
                    <ul className='services_names'>
                            {fulfilment && fulfilment.size ? (
                                Object.entries(fulfilment.size).map(([key, value]) => (
                                    value === 'Y' && ( // Render only if the size is available
                                        <li key={key}>
                                            
                                                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Display size name */}
                                        </li>
                                    )
                                ))
                            ) : (
                                "Dog Size Not Found"
                            )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Offers</Accordion.Header>
                    <Accordion.Body>
                    <ul className='offer_innercontent'>
                            {couponitems && couponitems.length > 0 ? (
                                couponitems.map((item, index) => (
                                    <li key={index}>
                                        
                                            <div>
                                            <p className='mb-0'>{item.discounts}%Discounts</p>
                                            <p  className='mb-0'>{item.title}</p>
                                            </div>
                                      
                                    </li>
                                ))
                            ) : (
                                "Offers not available"
                            )}
                            {/* <li>
                                <span>
                                    <img src={service_eigth} />
                                </span>

                                <Link to="/">
                                    Training</Link>
                            </li> */}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Sidebar;
