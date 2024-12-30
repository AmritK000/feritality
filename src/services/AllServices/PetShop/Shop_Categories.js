import React, { useEffect, useRef, useState } from "react";
import { Link,useLocation  } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { service_one } from "../../../components/Images";
import { service_two } from "../../../components/Images";
import { service_third } from "../../../components/Images";
import { service_fourth } from "../../../components/Images";
import { service_sixth } from "../../../components/Images";
import { service_seventh } from "../../../components/Images";
import {service_fifth} from  "../../../components/Images";
import { service_eigth } from '../../../components/Images';
import {shopCategoryDataList} from '../../../controllers/store/shopController';
import {ASSETS_BASE_URL} from '../../../config/constants';
const Shop_Categories  = ({ onCategorySelect }) => {
     const [ShopCategoryList, setShopCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const item = location.state?.item;
    const [activeCategory, setActiveCategory] = useState(null);
      /*********************************************************
    *  This function is use to fetch adoption center list
    *********************************************************/
      const ShopcategoryList = async () => {
        setShopCategoryList([]);
        setIsLoading(true);
        try {
           
            const options = {
                vendorId : item.vendorData,
                 storeId : item._id
            }
            const listData = await shopCategoryDataList(options);
            if (listData?.status === true) {
                setShopCategoryList(listData.result);
                const firstCategoryId = listData.result[0].category._id;
                setActiveCategory(firstCategoryId); // Set the first category as active
                onCategorySelect(firstCategoryId); 
            }
        } catch (error) {
            console.log("Failed to fetch groomoing shop list: ", error)
        }
    }

    /*********************************************************
     *  This function is load when page load and with dependency update
    *********************************************************/
    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId.category._id);
        onCategorySelect(categoryId); // Pass the selected category ID to parent
    }
    useEffect(() => {
        ShopcategoryList();
        document.title = "Frisbee website || Grooming store list"
    }, [])
    useEffect(() => {
        if (ShopCategoryList.length > 0) {
            const firstCategoryId = ShopCategoryList[0];
            setActiveCategory(firstCategoryId.category._id);
            onCategorySelect(firstCategoryId);
        }
    }, [ShopCategoryList]);

    return(
        <>
          <Accordion defaultActiveKey="0">
           <Accordion.Item eventKey="0">
        <Accordion.Header>Shop Categories</Accordion.Header>
        <Accordion.Body>
        <ul className='services_names'>
        {ShopCategoryList.length > 0 ? (
                                ShopCategoryList.map((item, index) => (
                                    <li key={index}className={activeCategory === item.category._id ? 'active' : ''}>
                                        <div onClick={() => handleCategoryClick(item)}>
                                            <span>
                                                <img src={`${ASSETS_BASE_URL}${item.category.image}`} alt={item.name} />
                                            </span>
                                            {item.category.name}
                                        </div>
                                    </li>
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
            <li>
                <Link to="/">
                <span>
            <img src={service_one} />
            </span>
            Grooming</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_two} />
            </span>
            Pet Shop</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_third} />
            </span>
            Day Care</Link>
            </li>
            <li>
                <Link to="/">  
                <span> 
            <img src={service_fourth} />
            </span>
            Boarding</Link></li>

            <li>
                <Link to="/">
                <span>
            <img src={service_sixth} />
            </span>
            Veterinary</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_seventh} />
            </span>
            Adoptions</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_fifth} />
            </span>
            Dog Friendly
            </Link>
            </li>
            <li>
                <span>
                <img src={service_eigth} />
                </span>
        
                <Link to="/">
            Training</Link></li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Size</Accordion.Header>
        <Accordion.Body>
        <ul className='services_names'>
            <li>
                <Link to="/">
                <span>
            <img src={service_one} />
            </span>
            Grooming</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_two} />
            </span>
            Pet Shop</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_third} />
            </span>
            Day Care</Link>
            </li>
            <li>
                <Link to="/">  
                <span> 
            <img src={service_fourth} />
            </span>
            Boarding</Link></li>

            <li>
                <Link to="/">
                <span>
            <img src={service_sixth} />
            </span>
            Veterinary</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_seventh} />
            </span>
            Adoptions</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_fifth} />
            </span>
            Dog Friendly
            </Link>
            </li>
            <li>
                <span>
                <img src={service_eigth} />
                </span>
        
                <Link to="/">
            Training</Link></li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Offers</Accordion.Header>
        <Accordion.Body>
        <ul className='services_names'>
            <li>
                <Link to="/">
                <span>
            <img src={service_one} />
            </span>
            Grooming</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_two} />
            </span>
            Pet Shop</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_third} />
            </span>
            Day Care</Link>
            </li>
            <li>
                <Link to="/">  
                <span> 
            <img src={service_fourth} />
            </span>
            Boarding</Link></li>

            <li>
                <Link to="/">
                <span>
            <img src={service_sixth} />
            </span>
            Veterinary</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_seventh} />
            </span>
            Adoptions</Link>
            </li>
            <li>
                <Link to="/">
                <span>
            <img src={service_fifth} />
            </span>
            Dog Friendly
            </Link>
            </li>
            <li>
                <span>
                <img src={service_eigth} />
                </span>
        
                <Link to="/">
            Training</Link></li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </>
    )
}
export default  Shop_Categories;