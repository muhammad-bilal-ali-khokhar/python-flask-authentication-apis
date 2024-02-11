import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetClient } from './useGetClient';

export const WelcomContent = () => {
    const [profile, setProfile] = React.useState();
    const navigate = useNavigate();
    const client = useGetClient();

    React.useEffect(() => {
      console.log('useLayoutEffect called');
      console.log('client:', client);
      if (client) {
        axios
          .get(`http://127.0.0.1:8000/${client.id}`)
          .then((response) => {
            setProfile(response?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('Client is null or undefined');
        navigate('/login');
      }
    }, [client, navigate]);
  return (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            textAlign: "center",
          }}>
          <h1 style={{ color: "#333", marginBottom: "20px" }}>
            Welcome {profile?.name}
          </h1>
          <p style={{ color: "#666" }}>
            This is where you can chat with your AI assistant.
          </p>
        </div>
  )
}
