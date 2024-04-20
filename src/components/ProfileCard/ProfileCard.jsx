import React, { useState } from 'react'
import "./ProfileCard.css"
import Map from '../Map/Map'

const ProfileCard = ({id, name, description, address, image , lat,lng}) => {
  const [isOpen , setIsOpen] = useState(false)
  const openMap =() => {
setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
  }
  
    return (
    <div className='card-container'>
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
    </div>
  )
}

export default ProfileCard