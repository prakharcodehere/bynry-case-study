
import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import UserInterface from './components/UserInterface/UserInterface';
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import male1 from '../src/assets/male1.jpg';
import male2 from '../src/assets/male2.jpg';
import male3 from '../src/assets/male3.jpg';
import male4 from '../src/assets/male4.jpg';
import female1 from '../src/assets/female1.jpg';
import female2 from '../src/assets/female2.jpg';


import Database from './data/database';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [profiles, setProfiles] = useState(Database);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    address: '',
    photo: '',
    gender: '',
    lat: 0,
    lng: 0
  });
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const handleAddProfile = () => {
    setShowAddForm(true);
    console.log("add user clicked")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value
    });
  };
  

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formattedAddress = formatAddress(newProfile.address);
    const { lat, lng } = await getLatLngFromAddress(formattedAddress);

    const photo = getImageOptions();
    console.log("Selected image:", photo); 
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1, photo }]);
    setNewProfile({
      name: '',
      description: '',
      address: '',
      photo: '',
      lat,
      lng,
      gender: '',
    });
    setShowAddForm(false);
    setNotification({ type: 'success', message: 'Profile added successfully' });
    setTimeout(() => {
      console.log(newProfile);
      setNotification(null);
    }, 3000);
   
  };


  const getLatLngFromAddress = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0]; // Changed lng to lon
        console.log(lat, lon);
        return { lat, lng: lon };
      }
      throw new Error('No results found');
    } catch (error) {
      console.error('Error fetching geocode data:', error.message);
      throw error;
    }
  };







  const getImageOptions = () => {
    if (newProfile.gender === 'male') {
      return male1;
    } else if (newProfile.gender === 'female') {
      return female1;
    }
    return '';
  };

  const validateForm = () => {
    if (!newProfile.name || !newProfile.address || !newProfile.description || !newProfile.gender) {
      setNotification({ type: 'error', message: 'All details are required' });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return false;
    }
    return true;
  };


  const handleEditProfile = (updatedProfile) => {
    const updatedProfiles = profiles.map((profile) => {
      if (profile.id === updatedProfile.id) {
        return { ...profile, ...updatedProfile };
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setNotification({ type: 'success', message: 'Profile updated successfully' });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };


  const formatAddress = (address) => {
   
    const [city, state] = address.split(',').map(part => part.trim());
    return `${city}, ${state}`; 

  }


  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };



  const handleSearch = (query) => {
   
    const filteredProfiles = profiles.filter(profile =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.address.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase())
    );
    // Update the profiles state with the filtered results
    setProfiles(filteredProfiles);
  };



  return (
    <div className="App">
      <NavBar isAdminMode={isAdminMode} onToggleAdminMode={toggleAdminMode}   onAddProfile={handleAddProfile} onSearch={handleSearch}/>
 <UserInterface database={Database} isAdminMode={isAdminMode}    onEditProfile={handleEditProfile}  profiles={profiles}  onDeleteProfile={handleDeleteProfile}/>
 {showAddForm && (
  <div className="modal-backdrop">
    <div className="add-form-container">
    
      <form onSubmit={handleSubmit}>
        <label>Enter Name</label>
        <input type="text" name="name" value={newProfile.name} onChange={handleChange} placeholder="Name" />
        <label>Enter Description</label>
        <input type="text" name="description" value={newProfile.description} onChange={handleChange} placeholder="Description" />
        <label>Enter Address</label>
        <input type="text" name="address" value={newProfile.address} onChange={handleChange} placeholder="Address" />
       
        <label>Select Gender</label>
<select name="gender" value={newProfile.gender} onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
<div className='form-button'>
        <button type="submit">Add Profile</button>
        <span className="close" onClick={() => setShowAddForm(false)}><FaWindowClose/></span>
        </div>
      </form>
    </div>
  </div>
)}
{notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}





    </div>
  );
}

export default App;
