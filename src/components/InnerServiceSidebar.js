import { Link, useNavigate,useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { service_one } from "../components/Images";
import { service_two } from "../components/Images";
import { service_third } from "../components/Images";
import { service_fourth } from "../components/Images";
import { service_sixth } from "../components/Images";
import { service_seventh } from "../components/Images";
import { service_fifth } from "../components/Images";
import { service_eigth } from '../components/Images';
import { useState, useEffect } from 'react';
import { list as aasignCategoriesService } from "../controllers/services/assignCategoriesController";
import SkeltonList from "../components/SkeltonEffect/list"
import { ASSETS_BASE_URL } from "../config/constants";
import { list as promoList } from "../controllers/booking/promoCode"


const InnerServiceSidebar = ({ slug, vendorData, storeId, onCategoryChange, StoreDetails, category }) => {
    const [assignService, setAssignService] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [couponitems, setCouponitems] = useState([]);
    const [matchingData, setMatchingData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Initialize useLocation
    const pathSegments = location.pathname.split('/').filter(Boolean).map(segment => segment.toLowerCase());

    /*********************************************************
    *  This function is use to fetch assign categories services to vendor 
    *********************************************************/
    const getServices = async () => {
        setAssignService([]);
        try {
            const options = {
                vendor_id: vendorData
            }
            const listData = await aasignCategoriesService(options);
            if (listData?.status === true) {
                setAssignService(listData.result);
            }
        } catch (error) {
            console.log("Failed to fetch sidebar services categories list:", error);
        }
    }

    const handleshopItemClick = (item) => {
        // Navigate to the shop page with the item name in the URL
        navigate("/shop", { state: { itemId: item } });
        localStorage.setItem('selectedSlug', item._id);
        if (typeof onCategoryChange === 'function') {
            onCategoryChange(item);
        } else {
            console.warn('onCategoryChange is not a function');
        }
    };

    const shopNameUrl = StoreDetails?.storeData?.shop_name
        ? StoreDetails.storeData.shop_name.replace(/\s+/g, '_')
        : 'traningdetail'; // Fallback to empty string if shop_name is undefined


    /*********************************************************
   *  This function is use to handle promo code list API
   *********************************************************/
    const fetchPromocodeData = async () => {
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
        getServices();
        fetchPromocodeData()
    }, [vendorData, currentPage, StoreDetails]);

    useEffect(() => {
        const checkMatchingKey = () => {
            let matchedData = null;

            // Loop through the keys in StoreDetails
            for (const key in StoreDetails) {
                if (key.endsWith("Fulfillment")) {
                    const keyStart = key.replace("Fulfillment", "").toLowerCase(); // Remove "Fulfillment" and convert to lowercase
                    
                    // Check if each segment matches the keyStart
                    if (pathSegments.includes(keyStart) && StoreDetails?.[key]) {
                        matchedData = StoreDetails[key];  // Store the matching data
                        break; // Break the loop once a match is found
                    }
                }
            }

            setMatchingData(matchedData); // Update state with matching data
        };

        checkMatchingKey();
    }, [pathSegments, StoreDetails]);


    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Other Services</Accordion.Header>
                    <Accordion.Body>
                        <ul className='services_names'>
                            {assignService?.length > 0 ? (assignService.map((item, index) => (
                                <li
                                    className={slug === item?.category?.slug ? 'active' : ''}
                                >
                                    {item?.category?.slug === 'shop' ? (
                                        <div onClick={() => handleshopItemClick(item)} style={{ cursor: 'pointer' }}>
                                            <span>
                                                <img src={`${ASSETS_BASE_URL}${item?.category?.image}`} alt={item?.category?.name} width={`100px`} />
                                            </span> {item?.category?.name}

                                        </div>
                                    ) : item?.category?.slug === 'training' ? (
                                        <Link to={`/services/${item?.category?.slug}/${shopNameUrl}`} state={{ storeId: storeId }} key={index}>
                                            <span>
                                                <img src={`${ASSETS_BASE_URL}${item?.category?.image}`} alt={item?.category?.name} width={`100px`} />
                                            </span>
                                            {item?.category?.name}
                                        </Link>
                                    ) : (
                                        <Link to={`/services/${item?.category?.slug}/${storeId}`} key={index}>
                                            <span>
                                                <img src={`${ASSETS_BASE_URL}${item?.category?.image}`} alt={item?.category?.name} width={`100px`} />
                                            </span> {item?.category?.name}
                                        </Link>
                                    )}
                                </li>
                            ))
                            ) : (
                                <SkeltonList />
                            )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Fulfilment Type</Accordion.Header>
                    <Accordion.Body>

                        <ul className='services_names'>
                            {matchingData  ? (
                                Object.entries(matchingData).map(([key, value]) => (
                                    value === 'Y' && ( // Render only if the size is available
                                        <li key={key}>
                                            {/* <Link to="/"> */}
                                               
                                                {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)} {/* Display size name */}
                                            {/* </Link> */}
                                        </li>
                                    )
                                ))
                            ) : (
                                "Dog Size Not Found"
                            )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Size</Accordion.Header>
                    <Accordion.Body>
                        <ul className='services_names'>
                            {StoreDetails && StoreDetails.size ? (
                                Object.entries(StoreDetails.size).map(([key, value]) => (
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
export default InnerServiceSidebar;

