import React, { useState } from 'react'
import "./ProfileCard.css"
import Map from '../Map/Map'
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";

const ProfileCard = ({id, name, description, address, image , lat,lng, isAdminMode,onEditProfile, onDeleteProfile, age , experience, gender, education, interest, contact}) => {
  const [isOpen , setIsOpen] = useState(false)
  const [showFullDetails, setShowExtraDetails] = useState(false)
  

  const openMap =() => {
setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
  }
  
  const handleEditClick = () => {
    onEditProfile({ id, name, description, address, image, lat, lng }); 
};


  const handleDeleteClick = () => {
    onDeleteProfile(id);
  }


  const toggleExtraDetails =() => {
setShowExtraDetails(!showFullDetails)
  }


    return (
    <div className='card-container' onClick={toggleExtraDetails}>
          <div className='user-wrapper'>
            <div className='img-wrapper'>
                <img src={image} alt="user" />
            </div>
            <div className='text-wrapper'>
                <span className='user-name'>{name}</span>
                <span className='user-bio'>{description}</span>
                
                <div className='address-wrapper'>
                    <span>{address}</span>
                    <span>
                        <button onClick={openMap}>Summary</button>
                    </span>
                </div>
            </div>

          
            {isAdminMode && (
       <div className='admin-buttons'>
       <button className='edit-btn' onClick={handleEditClick}>
         <MdEditSquare className='action-icon edit'/>
       </button>
       <button className='delete-btn' onClick={handleDeleteClick}>
         <RiDeleteBin2Fill className='action-icon delete'/>
       </button>
     </div>
     
        )}
          </div>
          {isOpen && 
          <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className='map-container'>
              <Map lat={lat} lng={lng} />
            </div>
          </div>
        </div>
          
          }
            {showFullDetails&& 
            <div className='user-extra-details'>
              <div className='user-age-gender'>
                <div className='user-age'>Age:<span>{age}</span></div>
                <div className='user-gender'>Gender:<span>{gender}</span></div>
              
                
              </div>
      <div className='user-educ-exp'>
        <div>Education:   <span className='user-edu'>{education}</span>   </div>
        <div>Experience: <span className='user-exp'>{experience}</span></div>
      </div>
      <div className='user-int-email'>
        <div>Interest: {interest}</div>
        <div className='user-email'>
          
          Email: {contact} {" "}
        <MdOutlineVerified/>
          </div>
      </div>
              
              </div>
              
              }

    </div>
  )
}

export default ProfileCard