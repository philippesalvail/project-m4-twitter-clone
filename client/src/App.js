import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import BookMarks from "./components/BookMarks";
import GlobalStyle from "./components/GlobalStyle";
import styled from "styled-components";

function App() {
  return (
    <SideBarAndPage>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <BookMarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </SideBarAndPage>
  );
}
const SideBarAndPage = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

export default App;
