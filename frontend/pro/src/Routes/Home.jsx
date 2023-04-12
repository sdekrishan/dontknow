import { useEffect } from "react";
import Chatbar from "../components/Chatbar";
import PostBar from "../components/PostBar";
import Sidebar from "../components/Sidebar";
import './Styles/Home.css'
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserPosts } from "../Redux/Posts/Post.action";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.posts);
  const {token} = useSelector(store=>store.auth)
  useEffect(() => {
    dispatch(getSingleUserPosts(token));
  }, []);
console.log(posts);
  return (
  <>
  <div className="maindiv">
    <div className="sidebar">
      <Sidebar/>
    </div>
    <div className="postdiv">
      <PostBar data={posts}/>
    </div>
    <div className="chatdiv">
      <Chatbar/>
    </div>
  </div>
  </>
  )
}

export default Home