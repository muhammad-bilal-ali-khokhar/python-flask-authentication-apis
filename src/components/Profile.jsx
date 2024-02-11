import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { useGetClient } from './useGetClient';
export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({ name: '', email: '' });
  const [deleteUser, setDeleteUser] = useState(false);
  const [requiredPassword, setRequiredPassword] = useState('');
  const [requiredNewPassword, setRequiredNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogout, setIsLogout] = useState(true);
  const navigate = useNavigate();
  const client = useGetClient();



  React.useEffect(() => {
    console.log('useLayoutEffect called');
    console.log('client:', client);
    if (client) {
      axios
        .get(`http://127.0.0.1:8000/${client.id}`)
        .then((response) => {
          setProfileDetails(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Client is null or undefined');
      navigate('/login');
    }
  }, [client, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsLogout(false)
    setDeleteUser(false);
  };

  const handleSaveClick = () => {
    const requestData = {
      id: client.id,
      email: client.email,
      password: requiredPassword,
      updated_name: profileDetails.name,
      updated_email: profileDetails.email,
      updated_password: requiredNewPassword,
    };
    axios
      .post(`http://127.0.0.1:8000/update`, requestData)
      .then((response) => {
        if(response.data.data === "Email already registered"){
          setErrorMessage('Email already registered');
        } else if (response.data.data === "some thing went wrong") {
          setErrorMessage('Wrong password');
        } else {
          alert('User updated');
          setRequiredPassword('');
          setRequiredNewPassword('');
          setIsEditing(false);
          setErrorMessage('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
  };

  const onDeleteProfile = () => {
    setDeleteUser(true);
    setIsEditing(false)
    setIsLogout(false)
    if(requiredPassword){
      const requestData = {
        id: profileDetails.id,
        email: profileDetails.email,
        password: requiredPassword,
      };
  
      axios
        .post(`http://127.0.0.1:8000/userDelete`, requestData)
        .then((response) => {
          if (response.data.data === 'wrong password') {
            setErrorMessage('Wrong password');
          } else {
            setRequiredPassword('');
            setRequiredNewPassword('');
            alert('Account Deleted Successfully');
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const logginOut =() =>{
    if(isLogout){
      if (client) {
        navigate('/');
        sessionStorage.removeItem('client');
      }
    }else{
      setIsEditing(false);
      setDeleteUser(false);
    }
    if(isEditing || deleteUser){
      setIsLogout(true)
    } 
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <Avatar alt={profileDetails.name} src="/profile.jpg" style={{ margin: 'auto', marginBottom: '20px', width: '100px', height: '100px' }} />
        <span style={{ display: 'flex', paddingBottom:'20px', justifyContent:'space-evenly' }}>
        <Link to={"/follower"} style={{ fontWeight: 'bold' , cursor:'pointer',textDecoration:'none',color:'#000'}}>Follower {client.followers.length}</Link>
        <Link to={"/following"} style={{ fontWeight: 'bold' , cursor:'pointer',textDecoration:'none',color:'#000'}}>Following {client.following.length}</Link>
        </span>
        <div style={{ marginBottom: '10px' , paddingRight:'20px', display: 'flex', flexDirection: 'column'}}>
          <label style={{ fontWeight: 'bold' }}>{isEditing ? 'Updated Name:' : 'Full Name:   '}</label>
          {isEditing ? (
            <input
              type='text'
              name='name'
              autoComplete='off'
              value={profileDetails.name}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          ) : (
            <label>{profileDetails.name}</label>
          )}
        </div>
        <div style={{ marginBottom: '10px' , paddingRight:'20px', display: 'flex', flexDirection: 'column'}}>
          <label style={{ fontWeight: 'bold' }}>{isEditing ? 'Updated Email:' : 'Email:   '}</label>
          {isEditing ? (
            <input
              type='email'
              name='email'
              autoComplete='off'
              value={profileDetails.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          ) : (
            <label>{profileDetails.email}</label>
          )}
        </div>
        {isEditing && (
          <>
            <div style={{ marginBottom: '10px' , paddingRight:'20px', display: 'flex', flexDirection: 'column'}}>
              <label style={{ fontWeight: 'bold' }}>New Password</label>
              <input
                type='password'
                name='newpassword'
                autoComplete='off'
                value={requiredNewPassword}
                onChange={(e) => setRequiredNewPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' , paddingRight:'20px', display: 'flex', flexDirection: 'column'}}>
              <label style={{ fontWeight: 'bold' }}>Old Password</label>
              <input
                type='password'
                name='password'
                autoComplete='off'
                value={requiredPassword}
                onChange={(e) => setRequiredPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
          </>
        )}
        {deleteUser && (
          <div style={{ marginBottom: '10px' , paddingRight:'20px', display: 'flex', flexDirection: 'column'}}>
            <label style={{ fontWeight: 'bold' }}>Required password</label><br />
            <input
              type='password'
              name='password'
              autoComplete='off'
              value={requiredPassword}
              onChange={(e) => setRequiredPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMessage}</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap:"10px" }}>
          <button onClick={isEditing ? handleSaveClick : handleEditClick} style={{ padding: '8px 20px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
            {isEditing ? 'Update Profile' : 'Edit Profile'}
          </button>
          <button onClick={onDeleteProfile} style={{ padding: '0px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {deleteUser ? 'confirm' : 'Delete Profile'}
          </button>
          <button onClick={logginOut} style={{ padding: '0px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLogout ? 'Logout' : 'cancle'}
          </button>
        </div>
      </div>
    </div>
  );
};
