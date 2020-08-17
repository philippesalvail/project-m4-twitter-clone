import React from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import TweetFeed from "./TweetFeed";

const Profile = () => {
  let { profileId } = useParams();
  const { currentUser, tweets } = React.useContext(CurrentUserContext);
  const [profileUser, setProfileUser] = React.useState(null);
  const [navValue, setNavValue] = React.useState(0);

  React.useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((response) => response.json())
      .then((profileData) => {
        setProfileUser(profileData);
      })
      .catch((err) => console.log(err));
  }, [profileId]);

  let profileTweetsAndRetweets = [];

  for (const element of tweets) {
    if (
      element.author.handle === profileId ||
      (element.hasOwnProperty("retweetFrom") &&
        element.retweetFrom.handle === profileId)
    ) {
      profileTweetsAndRetweets.push(element);
    }
  }
  console.log("tweetsAndRetweets: ", profileTweetsAndRetweets);

  return (
    <>
      {currentUser && profileUser ? (
        <ProfilePage>
          <SideBar />
          <ProfileDesc>
            <ProfileTop>
              <ProfileBanner src={profileUser.profile.bannerSrc} />
              <ProfileAvatar src={profileUser.profile.avatarSrc} />
              <ProfileMiddle>
                <FollowingBtn>Following</FollowingBtn>
              </ProfileMiddle>
            </ProfileTop>
            <ProfileBottom>
              <ProfileDisplayName>
                {profileUser.profile.displayName}
              </ProfileDisplayName>
              {profileUser.profile.isFollowingYou && (
                <ProfileFollower>
                  @{profileUser.profile.handle}{" "}
                  <FollowerStatement>follows you</FollowerStatement>
                </ProfileFollower>
              )}
              <ProfileBestFriend>{profileUser.profile.bio}</ProfileBestFriend>
              <ProfileLocationDate>
                <ProfileLocation>
                  <FiMapPin />
                  {profileUser.profile.location}
                </ProfileLocation>
                <ProfileDate>
                  <FiCalendar /> Joined {profileUser.profile.joined}
                </ProfileDate>
              </ProfileLocationDate>
              <ProfileNumFollowingFollower>
                <ProfileNumFollower>
                  {profileUser.profile.numFollowers} Followers
                </ProfileNumFollower>
                <ProfileNumFollowing>
                  {profileUser.profile.numFollowing} Following
                </ProfileNumFollowing>
              </ProfileNumFollowingFollower>
              <ProfileFollowerNames></ProfileFollowerNames>
            </ProfileBottom>
            <TweetsAndRetweets>
              <NavBar>
                <NavItem
                  onClick={() => {
                    setNavValue(0);
                  }}
                >
                  Tweet
                </NavItem>
                <NavItem
                  onClick={() => {
                    setNavValue(1);
                  }}
                >
                  Media
                </NavItem>
                <NavItem
                  onClick={() => {
                    setNavValue(2);
                  }}
                >
                  Likes
                </NavItem>
              </NavBar>

              <TweetTab>
                {navValue === 0 &&
                  profileTweetsAndRetweets.map((tweet) => {
                    return <TweetFeed tweet={tweet} user={profileUser} />;
                  })}
              </TweetTab>
            </TweetsAndRetweets>
          </ProfileDesc>
        </ProfilePage>
      ) : (
        <></>
      )}
    </>
  );
};

const FollowerStatement = styled.span`
  background-color: #dcdcdc;
`;

const TweetTab = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfilePage = styled.div`
  display: flex;
  flex: 1;
  width: 80%;
  margin: 0 auto;
`;
const ProfileDesc = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const NavItem = styled.li`
  list-style-type: none;
  font-family: source sans pro;
  font-weight: lighter;
  font-size: 25px;
  width: 100%;
  text-align: center;

  &:hover {
    border-bottom: 1px solid blue;
    color: blue;
  }
`;

const TweetsAndRetweets = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileLocationDate = styled.div`
  display: flex;
  width: 70%;
  margin-top: 2%;
`;
const ProfileLocation = styled.div`
  flex: 1;
`;
const ProfileDate = styled.div`
  flex: 1;
`;

const ProfileNumFollowingFollower = styled.div`
  display: flex;
  width: 70%;
  margin-top: 1%;
`;
const ProfileNumFollower = styled.div`
  flex: 1;
`;
const ProfileNumFollowing = styled.div`
  flex: 1;
`;

const ProfileBestFriend = styled.div``;
const ProfileFollower = styled.div`
  margin-bottom: 2%;
`;

const ProfileFollowerNames = styled.div``;

const ProfileDisplayName = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: black;
`;

const ProfileMiddle = styled.div`
  text-align: right;
  margin-top: -5%;
`;

const FollowingBtn = styled.button`
  background-color: blue;
  width: 200px;
  height: 50px;
  color: white;
  border-radius: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const ProfileBanner = styled.img`
  width: 100%;
  height: 50vh;
`;
const ProfileAvatar = styled.img`
  width: 16%;
  border-radius: 50%;
  margin-top: -9%;
  margin-left: 1%;
  border: 3px solid white;
`;

const ProfileTop = styled.div`
  flex: 1;
`;
const ProfileBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default Profile;
