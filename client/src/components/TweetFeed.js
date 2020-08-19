import React from "react";
import styled from "styled-components";
import { FiHeart, FiUpload, FiMessageCircle, FiRepeat } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const formatDate = (timestamp) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(timestamp).toLocaleDateString([], options);
};

const TweetFeed = (props) => {
  const {
    author,
    id,
    media,
    retweetFrom,
    timestamp,
    status,
    numRetweets,
    numLikes,
  } = props.tweet;

  const {
    likeTweet,
    setLikeTweet,
    toggleHomeFeed,
    setToggleHomeFeed,
  } = React.useContext(CurrentUserContext);

  React.useEffect(() => {}, [likeTweet]);

  console.log("retweeted from: ", props.tweet);

  const history = useHistory();

  const handleTweetDetails = (id) => {
    history.push(`/tweet/${id}`);
  };

  const handleTweetClick = (authorHandle) => {
    history.push(`/${authorHandle}`);
  };

  const handleKeyEvent = (ev) => {
    if (ev.key === "Enter") {
      history.push(`/${author.handle}`);
    }
  };

  let mediaURL = "";
  for (const element of media) {
    mediaURL = element.url;
  }

  const changeLikeStatus = async (id) => {
    let response = await fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !likeTweet }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setLikeTweet(!likeTweet);
    setToggleHomeFeed(!toggleHomeFeed);
  };

  return (
    <TweetPost>
      {retweetFrom && (
        <RetweetStamp>
          <FiRepeat /> {retweetFrom.displayName} remeowed this
        </RetweetStamp>
      )}
      <TweetInstance>
        <TweetUserAvatar src={author.avatarSrc} />
        <TweetBlog>
          <TweetHandleDisplayNameTimeStampStatus>
            <TweetHandleDisplayNameTimeStamp>
              <Tweethandle
                tabIndex="0"
                onClick={() => {
                  handleTweetClick(author.handle);
                }}
                onKeyPress={(ev) => {
                  handleKeyEvent(ev);
                }}
              >
                {author.displayName}
              </Tweethandle>
              <TweetDisplayName>
                {" "}
                @{author.handle} - {formatDate(timestamp)}
              </TweetDisplayName>
            </TweetHandleDisplayNameTimeStamp>
            <TweetStatus
              onClick={() => {
                handleTweetDetails(id);
              }}
            >
              {status}
            </TweetStatus>
            {mediaURL && <TweetBlogImage src={mediaURL} />}
          </TweetHandleDisplayNameTimeStampStatus>
          <TweetIcons>
            <TweetIcon>
              <TweetIconMessage tabIndex="0" />
            </TweetIcon>
            <TweetIcon>
              <TweetIconRepeat tabIndex="0" />
              {numRetweets > 0 ? numRetweets : ""}
            </TweetIcon>
            <TweetIcon>
              <TweetIconHeart
                tabIndex="0"
                color={numLikes ? "red" : ""}
                onClick={() => {
                  changeLikeStatus(id);
                }}
              />
              <TweetLike>{numLikes ? numLikes : ""}</TweetLike>
            </TweetIcon>
            <TweetIcon>
              <TweetIconUpload tabIndex="0" />
            </TweetIcon>
          </TweetIcons>
        </TweetBlog>
      </TweetInstance>
    </TweetPost>
  );
};
const TweetLike = styled.span`
  top: -1px;
  left: 4px;
  position: absolute;
  left: 15%;
`;
const TweetInstance = styled.div`
  display: flex;
`;
const RetweetStamp = styled.div`
  margin-bottom: 1%;
  margin-left: 3%;
`;

const TweetPost = styled.div`
  display: flex;
  flex-direction: column;
`;
const TweetBlog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5%;
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
`;
const Tweethandle = styled.span`
  font-weight: bold;
`;
const TweetDisplayName = styled.div``;

const TweetStatus = styled.div`
  display: flex;
`;
const TweetBlogImage = styled.img`
  width: 90%;
  height: 300px;
  margin-bottom: 1%;
  margin-top: 1%;
  border-radius: 20px;
`;

const TweetIcon = styled.div`
  flex: 1;
  text-align: left;
  position: relative;
`;

const TweetIcons = styled.div`
  display: flex;
`;

const TweetIconMessage = styled(FiMessageCircle)`
  flex: 1;
`;
const TweetIconRepeat = styled(FiRepeat)`
  flex: 1;
`;
const TweetIconHeart = styled(FiHeart)`
  flex: 1;
  color: ${(props) => props.color};
`;
const TweetIconUpload = styled(FiUpload)`
  flex: 1;
`;

export default TweetFeed;
