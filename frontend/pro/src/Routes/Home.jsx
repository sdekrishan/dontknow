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
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((store) => store.posts);
  const { token, id } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getSingleUserPosts(id, token));

    dispatch(getSingleUserDetails(id));
  }, []);

  return (
    <>
      <Sidebar />
      <div className="maindiv">
        <div className="postdiv">
          <PostBar data={posts} loading={isLoading} />
        </div>
        <div className="chatdiv">
          <Chatbar />
        </div>
      </div>
    </>
  );
};

export default Home;
