import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  React.useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/${id}`)
        .then((response) => {
          setProfile(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  const handleProfileView = () => {
    navigate(`/profile/${id}`);
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}>
      <AppBar
        position='static'
        style={{
          background: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #e0e0e0",
        }}>
        <Toolbar
          style={{ justifyContent: "space-between", maxWidth: "1200px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
              onClick={toggleDrawer(true)}
              style={{ cursor: "pointer" }}>
              <MenuIcon />
            </IconButton>
          </div>
          <div style={{display:'flex',gap:'10px', alignItems:'center'}}>
          <Typography
              variant='h6'
              style={{ cursor: "pointer", color: "#000", fontWeight: "bold" }}
              onClick={() => navigate("/")}>
              {profile?.name}
            </Typography>
          <Avatar
              alt={profile?.name}
              src={"profile?.img.jpg"}
              onClick={handleProfileView}
              style={{ cursor: "pointer", marginRight: "10px" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={openDrawer} onClose={toggleDrawer(false)}>
        <div style={{ width: "250px" }}>
          <List>
            {[
              { text: "Inbox", icon: <InboxIcon /> },
              { text: "Friend List", icon: <GroupIcon /> },
              { text: "Add Friend", icon: <PersonAddIcon /> },
              { text: "For You", icon: <FavoriteIcon /> },
              { text: "Friend Request", icon: <PersonAddIcon /> },
            ].map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
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
      {/* Add your content here */}
    </div>
  );
};
