import React, { useState } from 'react'
import Database from '../../data/database'
import ProfileCard from '../ProfileCard/ProfileCard'
import "./UserInterface.css"

const UserInterface = ({isAdminMode, profiles, onDeleteProfile ,onEditProfile}) => {
    const [editProfile, setEditProfile] = useState(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 6;

    const handleEdit = (profile) => {
        setEditProfile(profile);
      };
    
      const handleCancelEdit = () => {
        setEditProfile(null);
      };

      const handleSaveEdit = (updatedProfile) => {
        onEditProfile(updatedProfile);
        setEditProfile(null);
      };

      const indexOfLastProfile = currentPage * profilesPerPage;
      const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
      const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
  
      const paginate = (pageNumber) => {
          setCurrentPage(pageNumber);
      };


      const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };
  return (
    <div className='userinterface-container'>
{currentProfiles.map((user) => (
    <ProfileCard key={user.id} id={user.id} name={user.name} 
    description={user.description} address={user.address} image={user.photo}
age={user.age} experience={user.experience} gender={user.gender} interest={user.interests} education={user.education}
contact={user.contact}

     lat={user.lat} lng={user.lng} isAdminMode={isAdminMode}
     onDeleteProfile={onDeleteProfile} onEditProfile={handleEdit}



     />
))}
<div className='pagination-container'>
  <div className='pagination'>
    <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
    {[...Array(Math.ceil(profiles.length / profilesPerPage)).keys()].map(number => (
      <button key={number} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>{number + 1}</button>
    ))}
    <button onClick={nextPage} disabled={currentPage === Math.ceil(profiles.length / profilesPerPage)}>Next</button>
  </div>
</div>
{editProfile && (
        <EditProfileForm
          profile={editProfile}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  )
}


const EditProfileForm = ({ profile, onCancelEdit, onSaveEdit }) => {
    const [editedProfile, setEditedProfile] = useState({ ...profile });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedProfile({ ...editedProfile, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSaveEdit(editedProfile);
    };
  
    return (
        <div className="modal-backdrop">
        <div className="edit-form-container">
            <form onSubmit={handleSubmit} className="edit-form">

                <input type="text" name="name" value={editedProfile.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="description" value={editedProfile.description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="address" value={editedProfile.address} onChange={handleChange} placeholder="Address" />
              <div className='edit-form-age'>
                 <input type="text" name="age" value={editedProfile.age} onChange={handleChange} placeholder='Age' />
                 <input type="text" name="email"  value={editedProfile.email}  onChange={handleChange} placeholder='Email' />

              </div>
                 <input type="text" name="education" value={editedProfile.education} onChange={handleChange} placeholder='education' />
                 <input type="text" name="experience" value={editedProfile.experience} onChange={handleChange} placeholder='experience'/>

                
                
                
                <div className='form-button'>
                    <button type="submit">Save</button>
                    <button onClick={onCancelEdit}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
    );
  };

export default UserInterface