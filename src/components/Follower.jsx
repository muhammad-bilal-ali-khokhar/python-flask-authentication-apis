import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useGetClient } from "./useGetClient";


export const Follower = () => {
    
  const [users, setUsers] = React.useState([]);
  const client = useGetClient();
  console.log('client___',client)
  React.useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/add`)
      .then((response) => {
        setUsers(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
        setUsers(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
   }
  };
  const navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto 0px",
        width: "100%",
        overflowY: "auto", // Change from "scroll" to "auto"
        maxHeight: "calc(100vh - 50px)", // Adjust the height if needed
      }}>
        <span>{`followers ${client.followers.length}`}</span>
      {client?.followers?.map((user) => (
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
          <span style={{cursor:"pointer"}} onClick={()=>navigate(`/user_Profile/${user}`)}>
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
              {client?.name}
            </div>
            {/* <Button
              variant='contained'
              color='primary'
              onClick={() => onFollowing(user.id)}>
              FOLLOW
            </Button> */}
          </div>
        </div>
      ))}
    </div>
  );
};
