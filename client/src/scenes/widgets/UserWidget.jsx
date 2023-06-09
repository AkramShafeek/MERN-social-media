import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const url = `http://localhost:3001/users/${userId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await axios.get(url, config);
      console.log(response.data);
      setUser(response.data);
      const {
        firstname, lastname, location, occupation, viewedProfile, impressions, friends
      } = user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user)
    return null;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap={"0.5rem"}
        pb={"1.1rem"}
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={user.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer"
                }
              }}>
              {user.firstname} {user.lastname}
            </Typography>
            <Typography color={medium}>{user.friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems={"center"} gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user.location}</Typography>
        </Box>
        <Box display="flex" alignItems={"center"} gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box display="flex" alignItems={"center"} gap="1rem" mb="0.5rem">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Profile view: </Typography>
          <Typography color={main} fontWeight="500">{user.viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impressions of your post: </Typography>
          <Typography color={main} fontWeight="500">{user.impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Typography fontSize={"1rem"} color={main} fontWeight={"500"} mb={"1rem"}>
          Social Profiles
        </Typography>

        <FlexBetween gap={"1rem"} mb={"0.5rem"}>
          <FlexBetween gap={"1rem"}>
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={main}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap={"1rem"}>
          <FlexBetween gap={"1rem"}>
            <img src={linkedin} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={main}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>

    </WidgetWrapper>
  );
};

export default UserWidget;