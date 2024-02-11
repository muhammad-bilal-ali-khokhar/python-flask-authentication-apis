import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

export const UsersProfile = () => {
  const { id } = useParams();
  const [profileDetails, setProfileDetails] = useState({
    id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/${id}`)
        .then((response) => {
          setProfileDetails(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);
  


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign:'center'
        }}>
        <Avatar
          alt={profileDetails?.name}
          src='/profile.jpg'
          style={{
            cursor:"pointer",
            margin: "auto",
            marginBottom: "20px",
            width: "100px",
            height: "100px",
          }}
        />
        <div
          style={{
            marginBottom: "10px",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "column",
          }}>
          <label style={{ fontWeight: "bold" }}>{"Full Name:   "}</label>

          <label>{profileDetails?.name}</label>
        </div>
        <div
          style={{
            marginBottom: "10px",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "column",
          }}>
          <label style={{ fontWeight: "bold" }}>{"Email:   "}</label>

          <label>{profileDetails?.email}</label>
        </div>
      </div>
    </div>
  );
};
