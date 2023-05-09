import { useEffect } from "react";
import Chatbar from "../components/Chatbar";
import PostBar from "../components/PostBar";
import "./Styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserPosts } from "../Redux/Posts/Post.action";
import Sidebar from "../components/Sidebar";
import {
  getSingleUserDetails,
} from "../Redux/User/User.Actions";
const Home = () => {

  return (
    <>
      <Sidebar />
      <div className="maindiv">
        <div className="postdiv">
          <PostBar />
        </div>
        <div className="chatdiv">
          <Chatbar />
        </div>
      </div>
    </>
  );
};

export default Home;
