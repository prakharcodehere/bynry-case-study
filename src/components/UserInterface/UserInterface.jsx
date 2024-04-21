import React, { useState } from 'react'
import Database from '../../data/database'
import ProfileCard from '../ProfileCard/ProfileCard'
import "./UserInterface.css"

const UserInterface = ({isAdminMode, profiles, onDeleteProfile ,onEditProfile}) => {
    const [editProfile, setEditProfile] = useState(null);

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


  return (
    <div className='userinterface-container'>
{profiles.map((user) => (
    <ProfileCard id={user.id} name={user.name} description={user.description} address={user.address} image={user.photo} lat={user.lat} lng={user.lng} isAdminMode={isAdminMode} onDeleteProfile={onDeleteProfile} onEditProfile={handleEdit}/>
))}
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