import React from 'react'
import Database from '../../data/database'
import ProfileCard from '../ProfileCard/ProfileCard'

const UserInterface = () => {
  return (
    <div>
{Database.map((user) => (
    <ProfileCard id={user.id} name={user.name} description={user.description} address={user.address} image={user.photo} lat={user.lat} lng={user.lng}/>
))}

    </div>
  )
}

export default UserInterface