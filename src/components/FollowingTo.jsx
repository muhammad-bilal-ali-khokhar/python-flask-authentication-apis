import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useGetClient } from "./useGetClient";


export const FollowingTo = () => {
  const [users, setUsers] = React.useState([]);
  const client = useGetClient();
  const navigate = useNavigate();
  const [idToFollowing , setIdToFollowing] = React.useState('');

  React.useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/allusers`)
      .then((response) => {
        setUsers(response?.data);
        navigate('/suggestions');

      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);


  const onFollowing = (followingId) => {
    const followingDetails = {
      follower_id: client.id,
      follower_email: client.email,
      follower_password: client.password,
      followTo: followingId,
    }
   if(client){
     axios
      .post(`http://127.0.0.1:8000/following`,followingDetails)
      .then((response) => {
        if(response.data.data === 'new follower added successfully'){
          setIdToFollowing(followingId)
        }
      })
      .catch((error) => {
        console.log(error);
      });
   }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto 0px",
        width: "100%",
        overflowY: "auto", // Change from "scroll" to "auto"
        maxHeight: "calc(100vh - 50px)", // Adjust the height if needed
      }}>
      {Array.isArray(users) && users.map((user) => (
        <div
          key={user.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "10px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}>
          <span style={{cursor:"pointer"}} onClick={()=>navigate(`/user_Profile/${user.id}`)}>
            {" "}
            <Avatar
              src={user.avatar}
              alt={user.name}
              style={{ marginRight: "15px" }}
            />
          </span>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "5px",
              }}>
              {user?.name}
            </div>
            <Button
              id={user.id}
              variant={idToFollowing === user.id ? 'outlined' : 'contained'}
              color='primary'
              onClick={() => onFollowing(user.id)}>
              {user.id === idToFollowing ? "Following" : 'Follow'} 
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
