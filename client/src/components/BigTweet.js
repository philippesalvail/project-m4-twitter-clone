// import React from "react";
// import styled from "styled-components";
// import { FiHeart, FiUpload, FiMessageCircle, FiRepeat } from "react-icons/fi";
// import { useHistory } from "react-router-dom";

// const BigTweet = (props) => {
//   const { status, timestamp } = props.tweet.tweet;
//   const { handle, displayName, avatarSrc } = props.currentUser.profile;

//   let history = useHistory();

//   const handleClick = (authorHandle) => {
//     console.log("authorHandle: ", authorHandle);
//     history.push(`/${authorHandle}`);
//   };
//   const handleKeyEvent = (ev) => {
//     if (ev.key == "Enter") {
//       history.push(`/${handle}`);
//     }
//     history.push(`/${ev.target.innerHTML}`);
//   };

//   return (
//     <TweetPost>
//       <TweetUserAvatar src={avatarSrc} />
//       <TweetBlog>
//         <TweetHandleDisplayNameTimeStampStatus>
//           <TweetHandleDisplayNameTimeStamp>
//             <Tweethandle
//               tabIndex="0"
//               onClick={() => {
//                 handleClick(handle);
//               }}
//               onKeyPress={(ev) => {
//                 handleKeyEvent(ev);
//               }}
//             >
//               {displayName}
//             </Tweethandle>
//             <TweetDisplayName> @{handle} -</TweetDisplayName>
//             <TweetTimeStamp>{timestamp}</TweetTimeStamp>
//           </TweetHandleDisplayNameTimeStamp>
//           <TweetStatus>{status}</TweetStatus>
//         </TweetHandleDisplayNameTimeStampStatus>
//         <TweetIcons>
//           <TweetIcon>
//             <TweetIconMessage tabIndex="0" />
//           </TweetIcon>
//           <TweetIcon>
//             <TweetIconRepeat tabIndex="0" />
//           </TweetIcon>
//           <TweetIcon>
//             <TweetIconHeart tabIndex="0" />
//           </TweetIcon>
//           <TweetIcon>
//             <TweetIconUpload tabIndex="0" />
//           </TweetIcon>
//         </TweetIcons>
//       </TweetBlog>
//     </TweetPost>
//     // <></>
//   );
// };

// const TweetPost = styled.div`
//   display: flex;
// `;
// const TweetBlog = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin-bottom: 5%;
// `;

// const TweetUserAvatar = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   margin-right: 2%;
// `;

// const TweetHandleDisplayNameTimeStampStatus = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const TweetHandleDisplayNameTimeStamp = styled.div`
//   display: flex;
// `;
// const Tweethandle = styled.span`
//   font-weight: bold;
// `;
// const TweetDisplayName = styled.div``;
// const TweetTimeStamp = styled.div``;
// const TweetStatus = styled.div`
//   display: flex;
// `;
// const TweetBlogImage = styled.img`
//   width: 90%;
//   height: 300px;
//   margin-bottom: 1%;
//   margin-top: 1%;
//   border-radius: 20px;
// `;

// const TweetIcon = styled.div`
//   flex: 1;
//   text-align: left;
// `;

// const TweetIcons = styled.div`
//   display: flex;
// `;

// const TweetIconMessage = styled(FiMessageCircle)`
//   flex: 1;
// `;
// const TweetIconRepeat = styled(FiRepeat)`
//   flex: 1;
// `;
// const TweetIconHeart = styled(FiHeart)`
//   flex: 1;
// `;
// const TweetIconUpload = styled(FiUpload)`
//   flex: 1;
// `;

// export default BigTweet;
