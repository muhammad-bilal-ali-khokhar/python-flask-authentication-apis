import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails ,setProfileDetails] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useLayoutEffect(() => {
    if(id){
        axios
          .get(`http://127.0.0.1:8000/${id}`)
          .then((response) => {
            console.log(response);
            setProfileDetails(response?.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [id])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save operation here
    setIsEditing(false);
  };

  const handleFullNameChange = (e) => {
    setProfileDetails({
        ...profileDetails,
        name: e.target.value
    })
    };

  const handleEmailChange = (e) => {
    setProfileDetails({
        ...profileDetails,
        email: e.target.value
    })
  };
  const onDeletProfile = (e) => {
    axios
          .get(`http://127.0.0.1:8000/delete/${id}`)
          .then((response) => {
            console.log(response);
            if(response){
                alert('Accout Deleted Successfuly')
                navigate('/')
            }
          })
          .catch((error) => {
            console.log(error);
          });
  };
  return (
    <div className='flex flex-column justify-content-center align-items-center p-d-flex p-flex-column p-jc-center p-ai-center h-screen formBgImage'>
      <div className='formBg formBgHome flex column justify-content-center align-items-center p-jc-center p-ai-center w-3 flex flex-column border-round-2xl px-5 py-5 absolute'>
        <h1 style={{ color: "whitesmoke" }}>Profile</h1>
          <label className='text-yellow-50 font-bold'>Full Name</label><br/>
          {isEditing ? (
            <input
              type='text'
              name='name'
              autoComplete='off'
              value={profileDetails?.name}
              onChange={handleFullNameChange}
            />
          ) : (
            <label className='text-yellow-50'>{profileDetails?.name}</label>
          )}
          <br/><label className='text-yellow-50 font-bold'>Email</label><br/>
          {isEditing ? (
            <input
              type='email'
              name='email'
              autoComplete='off'
              value={profileDetails?.email}
              onChange={handleEmailChange}
            />
          ) : (
            <label className='text-yellow-50'>{profileDetails?.email}</label>
          )}
          <br />
          {isEditing && (
            <>
            <label className='text-yellow-50 font-bold'>password Required to delete</label><br/>
            <input
              type='email'
              name='password'
              autoComplete='off'
              value={profileDetails?.email}
              onChange={handleEmailChange}
            />
            </>
          )}
          <br />
          <button onClick={isEditing ? handleSaveClick : handleEditClick} className='text-yellow-50 font-bold'>
            {isEditing ? 'Update Profile' : 'Edit Profile'}
          </button>
          <button onClick={onDeletProfile} className='text-yellow-50 font-bold'>
            Delete Profile
          </button>
        </div>
      </div>
  );
};
