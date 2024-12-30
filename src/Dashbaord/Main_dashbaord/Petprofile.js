import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { MdOutlineEdit } from "react-icons/md";
import { recent_booking } from "../../components/Images";
import { ASSETS_BASE_URL } from "../../config/constants.js";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchIpAddress } from "../../controllers/API";
import { calculateAge } from "../../util/common";
import { breedList, petData, petList, updatepetProfiles, deletePetProfile } from "../../controllers/accounts/Account.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Petprofile = () => {
  const [petparents, setpetparents] = useState(false);
  const [listing, setListing] = useState(true);
  const [profiles, setProfiles] = useState({});
  const [petListing, setPetListing] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [breeds, setBreeds] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));

  /*********************************************************
  *  This function is use to validateForm for pet details
  *********************************************************/
  const validateFormData = async (formData) => {
    if (
      formData.get("name") === "undefined" ||
      formData.get("name") === null ||
      formData.get("name").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        name: "Pet Name is required",
      }));
      return false;
    } else if (
      formData.get("breed") === "undefined" ||
      formData.get("breed") === null ||
      formData.get("breed").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        breed: "Breed is required",
      }))
      return false;
    } else if (
      formData.get("city") === "undefined" ||
      formData.get("city") === null ||
      formData.get("city").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        city: "City is required",
      }))
      return false;
    } else if (
      formData.get("dob") === "undefined" ||
      formData.get("dob") === null ||
      formData.get("dob").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        dob: "DOB is required",
      }))
      return false;
    } else if (
      formData.get("gender") === "undefined" ||
      formData.get("gender") === null ||
      formData.get("gender").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        gender: "Gender is required",
      }))
      return false;
    } else {
      return true;
    }
  }; //End


  /*********************************************************
     *  This function is use to handleSubmit for pet details
     *********************************************************/
  const getList = async () => {
    try {
      const options = {
        condition: {},
        select: { name: 1 },
        sort: { _id: -1 },
      };
      const listData = await breedList(options);
      if (listData.status && Array.isArray(listData.result)) {
        setBreeds(listData.result.map((breed) => breed.name));
      } else {
        setBreeds([]);
      }
    } catch (error) {
      console.log("Error fetching breeds:", error);
      setBreeds([]);
    }
  };


  /*********************************************************
  *  This function is use to handleSubmit for pet details
    *********************************************************/
  const petLists = async () => {
    try {
      const options = {
        type: "",
        condition: {
          userData: userInfo?._id,
          status: "A"
        },
        select: {},
        sort: { _id: -1 },
        populate: {
          key: "",
          select: " "
        }
      };
      const listData = await petList(options);
      if (listData.status && Array.isArray(listData.result)) {
        setPetListing(listData.result);
        setListing(true);
      } else {
        setPetListing([]);
        setListing(false);
      }
    } catch (error) {
      console.error("Error fetching pet lists:", error);
      setPetListing([]);
      setListing(false);
    }
  };

  // Add new pet
  const addPet = () => {
    setProfiles({});
    setpetparents(true);
    setIsEditing(false);
    // setListing(false);
  };

  // Edit pet
  const editPet = (pet) => {
    setProfiles(pet);
    setpetparents(true);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const updateProfile = { ...profiles };
    updateProfile[name] = value;
    setProfiles(updateProfile);
    setErrors((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  /*********************************************************
    *  This function is use to handleSubmit for pet details
    *********************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const ipAddress = await fetchIpAddress();
      formData.append('ipAddress', ipAddress);
      formData.append('platform', 'web');
      const isValidate = await validateFormData(formData);
      if (isValidate) {
        let res;
        if (isEditing && profiles._id) {
          res = await updatepetProfiles(formData, profiles._id);
        } else {
          const options = {
            url: "users/create-pet-profile",
            postData: formData,
          };
          res = await petData(options);
        }
        if (res?.status === true) {
          toast.success(`Profile ${isEditing ? 'updated' : 'added'} successfully!`);
          setpetparents(false);
          // setPetListing(true)
          setIsEditing(false);
          setProfiles({});
          // setListing(true);
          petLists();
        } else {
          toast.error(`Error ${isEditing ? 'updating' : 'adding'} profile`);
        }
      }
    } catch (error) {
      console.error(`Error submitting profile `, error);
    }
  }


  const handleDeletePet = async (pet) => {
    try {
      const res = await deletePetProfile({ id: pet });
      if (res?.status === true) {
        toast.success('Profile deleted successfully');
        petLists();
      } else {
        toast.error('Error deleting profile');
      }
    } catch (error) {
      toast.error('Error deleting profile');
      console.log('Error deleting profile:', error);
    }
  };


  useEffect(() => {
    getList();
    petLists();
  }, []);

  return (
    <>
      <Navbar />
      <Dashbaordsidebar />
      <div className="main_wrapper inner_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className=" mt-2">
                <h1 className="heading">Pet Profiles</h1>
                <p className="sub_heading_dash">Pet Profiles</p>
              </div>

            </div>
            <div className="col-md-6">
              <div className="textalign_right mt-2">
                <button className="edit_btn" onClick={addPet}>Add New Pet</button>
              </div>
            </div>
          </div>
          {petparents &&
            <div className="row">
              <div className="col-md-12">
                <div className="row pet_profile ">
                  <div className="col-md-2">
                    <div className="pet_profile_img">
                      <img src={recent_booking}></img>
                      <div className="edit_delete">
                        <button><MdOutlineEdit onClick={editPet} /></button>
                        <button><AiOutlineDelete /></button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            placeholder="Pet’s Name"
                            name="name"
                            value={profiles?.name || ''}
                            onChange={handleChange}
                          />
                          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                        <div className="col-md-4">
                          <select name="breed" value={profiles?.breed || ''} onChange={handleChange}>
                            <option value="">Select Breed</option>
                            {breeds.map((breed, i) => (
                              <option key={i} value={breed}>{breed}</option>
                            ))}
                          </select>
                          {errors.breed && <p style={{ color: "red" }}>{errors.breed}</p>}
                        </div>
                        <div className="col-md-4">
                          <select name="gender" value={profiles?.gender || ''} onChange={handleChange}>
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
                        </div>
                        <div className="col-md-4">
                          <input
                            type="date"
                            placeholder="DOB"
                            name="dob"
                            value={profiles?.dob || ""}
                            onChange={handleChange}
                          />
                          {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            placeholder="Location"
                            name="city"
                            value={profiles?.city || ''}
                            onChange={handleChange}
                          />
                          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
                        </div>
                        <div className="col-md-4">
                          <button className="edit_btn">{isEditing ? "Update Profile" : "Save Profile"}</button>
                          <ToastContainer />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* <!-edit end section --> */}
          {listing && petListing.length > 0 ? (
            <div className={`row edit ${isEditing ? "blur-content" : ""}`}>
              {petListing.map((pet) => (
                <div className="col-md-6">
                  {/* {console.log("petListing", petListing)} */}
                  <div className="pet_profile d-flex">
                    <div className="pet_profile_img">
                      {/* <img src={recent_booking}></img> */}
                      <img src={`${ASSETS_BASE_URL}${pet?.image}`} alt={pet.name} />
                      <div className="edit_delete">
                        <MdOutlineEdit onClick={() => editPet(pet)} />
                        <AiOutlineDelete onClick={() => handleDeletePet(pet?._id)} />
                      </div>
                    </div>
                    <div className="">
                      <div className="d-flex">
                        <input placeholder="Pet’s Name" value={pet?.name} readOnly></input>
                        <input placeholder="Pet Breed" value={pet?.breed} readOnly></input>
                      </div>
                      <div className="d-flex">
                        <input placeholder="Pet Age" value={pet?.dob ? calculateAge(pet?.dob) : ""} readOnly></input>
                        <input placeholder="Gender" value={pet?.gender} readOnly></input>
                      </div>
                      <div className="d-flex">
                        <input placeholder="city" value={pet?.city} readOnly></input>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "No pet found"
          )}
        </div >
      </div >
    </>
  )
}
export default Petprofile;


