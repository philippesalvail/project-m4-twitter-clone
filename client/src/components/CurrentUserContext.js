import React from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [homeFeed, setHomeFeed] = React.useState(null);
  const [toggleHomeFeed, setToggleHomeFeed] = React.useState(false);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    fetch("/api/me/profile")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idol");
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((data) => {
        setHomeFeed(data);
      })
      .catch((err) => console.log("err: ", err));
  }, [toggleHomeFeed]);

  let tweets = [];
  if (homeFeed) {
    tweets = homeFeed.tweetIds.map((tweetID) => {
      return homeFeed.tweetsById[tweetID];
    });
    console.log("tweets in HomeFeed: ", tweets);
  }

  console.log("in homefeed");

  console.log("in current  user context");

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, tweets, toggleHomeFeed, setToggleHomeFeed }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
