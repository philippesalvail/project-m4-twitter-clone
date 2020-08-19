import React from "react";
import SideBar from "./Sidebar";
import { CurrentUserContext } from "./CurrentUserContext";
import styled, { css, keyframes } from "styled-components";
import { spinner10 } from "react-icons-kit/icomoon/spinner10";
import { Icon } from "react-icons-kit";

import TweetFeed from "./TweetFeed";

const Home = () => {
  const {
    status,
    currentUser,
    tweets,
    toggleHomeFeed,
    setToggleHomeFeed,
  } = React.useContext(CurrentUserContext);
  const [charCount, setCharCount] = React.useState(0);
  const [tweetMessage, setTweetMessage] = React.useState("");
  const [color, setColor] = React.useState("#cecece");
  const [btnOpacity, setbtnOpacity] = React.useState(0.5);
  const CHARACTER_MAX = 280;

  const messageCount = (e) => {
    e.target.value.length === 0 || e.target.value.length > CHARACTER_MAX
      ? setbtnOpacity(0.5)
      : setbtnOpacity(1);

    setCharCount(e.target.value.length);
    setTweetMessage(e.target.value);

    switch (true) {
      case charCount > CHARACTER_MAX:
        setColor("red");
        break;
      case charCount > Math.floor(0.8 * CHARACTER_MAX):
        setColor("yellow");
        break;
      default:
        setColor("#cecece");
        break;
    }
  };

  const publishTweets = () => {
    return tweets.map((tweet) => {
      return <TweetFeed tweet={tweet} />;
    });
  };

  const postTweet = async (message) => {
    let response = await fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({
        status: `${message}`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setToggleHomeFeed(!toggleHomeFeed);
    setTweetMessage("");
  };

  return (
    <>
      {tweets && status && currentUser ? (
        <HomePage>
          <SideBar />
          <TweetPostings>
            <TweetMessage>
              <TweetMessageBanner>
                <TweetMessageBannerHome>Home</TweetMessageBannerHome>
              </TweetMessageBanner>
              <TweetForm
                onSubmit={(e) => {
                  e.preventDefault();
                  postTweet(tweetMessage);
                }}
              >
                <TweetMessageBody>
                  <TweetMessageAvatar src={currentUser.profile.avatarSrc} />
                  <TweetMessageTextArea
                    placeholder="What's happening?"
                    onChange={(e) => {
                      messageCount(e);
                    }}
                    value={tweetMessage}
                  />
                </TweetMessageBody>
                <TweetMessageBottom>
                  <TweetMessageBannerCharCount color={color}>
                    {charCount}
                  </TweetMessageBannerCharCount>
                  <TweetMessageSubmitBtn
                    disabled={
                      charCount === 0 || charCount > CHARACTER_MAX
                        ? true
                        : false
                    }
                    type="submit"
                    btnOpacity={btnOpacity}
                  >
                    Meow
                  </TweetMessageSubmitBtn>
                </TweetMessageBottom>
              </TweetForm>
            </TweetMessage>

            {publishTweets()}
          </TweetPostings>
        </HomePage>
      ) : (
        <>
          <Spinner icon={spinner10} />
        </>
      )}
    </>
  );
};
export default Home;

const spin = keyframes`
0% {
  transform: rotate( 0deg );
}
10% {
  transform: rotate( 15deg );
}
50% {
  transform: rotate( -180deg );
}
100% {
  transform: rotate( -360deg );
}
`;

const Spinner = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  display: block;
  animation: ${spin} 1s infinite;
  svg {
    display: block !important;
  }
`;
const TweetForm = styled.form``;

const TweetMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  border-bottom: 10px solid lightgray;
  margin-bottom: 1%;
`;
const TweetMessageBanner = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  font-size: 25px;
`;
const TweetMessageBannerHome = styled.span`
  margin: 1%;
`;

const TweetMessageBody = styled.div`
  display: flex;
`;
const TweetMessageAvatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-top: 1%;
`;
const TweetMessageTextArea = styled.textarea`
  width: 75%;
  height: 25vh;
  padding: 2%;
  border: none;
  font-size: 25px;
  resize: none;
  &:focus {
    outline: none;
  }
`;
const TweetMessageBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1%;
`;
const TweetMessageSubmitBtn = styled.button`
  width: 125px;
  height: 40px;
  border-radius: 25px;
  background-color: blue;
  opacity: ${(props) => props.btnOpacity};
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const TweetMessageBannerCharCount = styled.span`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  margin-right: 1%;
  color: ${(props) => props.color};
`;

const HomePage = styled.div`
  display: flex;
`;

const TweetPostings = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 2%;
`;

const TweetPost = styled(TweetFeed)`
  margin-bottom: 1%;
`;
