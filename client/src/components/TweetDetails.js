import React from "react";
import styled from "styled-components";
import { FiHeart, FiUpload, FiMessageCircle, FiRepeat } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";

const formatDate = (timestamp) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(timestamp).toLocaleDateString([], options);
};

const formatTime = (timestamp) => {
  let date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const TweetDetails = (props) => {
  const [tweetDetails, setTweetDetails] = React.useState(null);
  let { tweetId } = useParams();
  let mediaURL = "";
  let history = useHistory();

  React.useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetDetails(data);
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  let { avatarSrc, displayName, handle } = {};
  let { status, timestamp, media } = {};

  if (tweetDetails) {
    avatarSrc = tweetDetails.tweet.author.avatarSrc;
    displayName = tweetDetails.tweet.author.displayName;
    handle = tweetDetails.tweet.author.handle;
    status = tweetDetails.tweet.status;
    timestamp = tweetDetails.tweet.timestamp;
    media = tweetDetails.tweet.media;

    for (const element of media) {
      mediaURL = element.url;
    }

    console.log("formatDate: ");
  }

  const handleClick = (authorHandle) => {
    history.push(`/${authorHandle}`);
  };
  const handleKeyEvent = (ev) => {
    if (ev.key == "Enter") {
      history.push(`/${handle}`);
    }
    history.push(`/${ev.target.innerHTML}`);
  };

  return (
    <>
      {tweetDetails && (
        <TweetDetail>
          <SideBar />
          <TweetPost>
            <TweetAvatarDisplayNameHandle>
              <TweetUserAvatar src={avatarSrc} />
              <TweetDisplayNameHandle>
                <Tweethandle
                  tabIndex="0"
                  onClick={() => {
                    handleClick(handle);
                  }}
                  onKeyPress={(ev) => {
                    handleKeyEvent(ev);
                  }}
                >
                  {displayName}
                </Tweethandle>
                <TweetDisplayName> @{handle} </TweetDisplayName>
              </TweetDisplayNameHandle>
            </TweetAvatarDisplayNameHandle>
            <TweetStatus>{status}</TweetStatus>
            {mediaURL && <TweetBlogImage src={mediaURL} />}
            <TweetTimeStamp>
              {formatTime(timestamp)} - {formatDate(timestamp)}
            </TweetTimeStamp>
            <TweetIcons>
              <TweetIcon>
                <TweetIconMessage tabIndex="0" />
              </TweetIcon>
              <TweetIcon>
                <TweetIconRepeat tabIndex="0" />
              </TweetIcon>
              <TweetIcon>
                <TweetIconHeart tabIndex="0" />
              </TweetIcon>
              <TweetIcon>
                <TweetIconUpload tabIndex="0" />
              </TweetIcon>
            </TweetIcons>
          </TweetPost>
        </TweetDetail>
      )}
    </>
  );
};

const TweetDetail = styled.div`
  display: flex;
  width: 100%;
`;
const TweetPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 2%;
`;

const TweetAvatarDisplayNameHandle = styled.div`
  display: flex;
`;

const TweetDisplayNameHandle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TweetUserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 2%;
`;

const TweetHandleDisplayNameTimeStampStatus = styled.div`
  display: flex;
  flex-direction: column;
`;
const TweetHandleDisplayNameTimeStamp = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tweethandle = styled.span`
  font-weight: bold;
`;
const TweetDisplayName = styled.div``;
const TweetTimeStamp = styled.div`
  padding-bottom: 2%;
  padding-top: 2%;
  border-bottom: 1px solid LightGray;
  width: 90%;
`;
const TweetStatus = styled.div`
  display: flex;
  font-size: 25px;
  margin-top: 2%;
  margin-bottom: 2%;
`;
const TweetBlogImage = styled.img`
  width: 90%;
  height: 350px;
  border-radius: 20px;
`;

const TweetIcon = styled.div`
  flex: 1;
  text-align: left;
`;

const TweetIcons = styled.div`
  display: flex;
  padding-top: 3%;
  padding-bottom: 3%;
`;

const TweetIconMessage = styled(FiMessageCircle)`
  flex: 1;
`;
const TweetIconRepeat = styled(FiRepeat)`
  flex: 1;
`;
const TweetIconHeart = styled(FiHeart)`
  flex: 1;
`;
const TweetIconUpload = styled(FiUpload)`
  flex: 1;
`;

export default TweetDetails;
