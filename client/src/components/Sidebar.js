import React from "react";
import styled from "styled-components";
import { FiHome, FiUser, FiBookmark } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ReactComponent as CatLogo } from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";

function SideBar() {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  let history = useHistory();

  const handleClick = (authorHandle) => {
    console.log("authorHandle: ", authorHandle);
    history.push(`/${authorHandle}`);
  };

  return (
    <>
      {status === "idol" ? (
        <TweetSideBar>
          <TweetViewNavigator>
            <Logo />
            <NavigationLink to="/" exact>
              <TweetViewHome>
                <FHome />
                <Home>Home</Home>
              </TweetViewHome>
            </NavigationLink>
            <NavigationLink
              to={`/${currentUser.profile.handle}`}
              onClick={() => {
                handleClick(currentUser.profile.handle);
              }}
            >
              <TweetViewProfile>
                <FUser />
                <Profile>Profile</Profile>
              </TweetViewProfile>
            </NavigationLink>
            <NavigationLink to="/notifications">
              <TweetViewNotification>
                <IoIosNotification />
                <Notification>Notifications</Notification>
              </TweetViewNotification>
            </NavigationLink>
            <NavigationLink to="/bookmarks">
              <TweetViewBookMark>
                <FBookmark />
                <BookMark>BookMarks</BookMark>
              </TweetViewBookMark>
            </NavigationLink>
            <TweetViewButton>Meow</TweetViewButton>
          </TweetViewNavigator>
        </TweetSideBar>
      ) : (
        <>{status}</>
      )}
    </>
  );
}

const PaddedSpan = styled.span`
  padding: 5%;
  font-weight: bold;
`;

const NavigationLink = styled(NavLink)`
  &.active {
    color: ${COLORS.primary};
  }
  &:hover {
    background-color: cyan;

    border-radius: 20px;
    width: 200px;
  }
`;

const Logo = styled(CatLogo)`
  padding: 5%;
`;
const FHome = styled(FiHome)`
  padding: 5%;
`;
const FUser = styled(FiUser)`
  padding: 5%;
`;
const IoIosNotification = styled(IoIosNotificationsOutline)`
  padding: 5%;
`;
const FBookmark = styled(FiBookmark)`
  padding: 5%;
`;

const Home = styled(PaddedSpan)``;

const Profile = styled(PaddedSpan)``;

const Notification = styled(PaddedSpan)``;

const BookMark = styled(PaddedSpan)``;

const TweetSideBar = styled.div`
  display: flex;
  width: fit-content;
`;
const TweetViewNavigator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TweetViewButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: blue;
  color: white;
  font-size: 20px;
  border-radius: 20px;
  margin-top: 5%;
`;
const TweetViewBookMark = styled.div`
  display: flex;
  flex-direction: row;
`;
const TweetViewNotification = styled.div`
  display: flex;
  flex-direction: row;
`;
const TweetViewProfile = styled.div`
  display: flex;
  flex-direction: row;
`;
const TweetViewHome = styled.div`
  display: flex;
  flex-direction: row;
`;

export default SideBar;
