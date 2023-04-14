import { useEffect } from "react";
import Chatbar from "../components/Chatbar";
import PostBar from "../components/PostBar";
import './Styles/Home.css'
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserPosts } from "../Redux/Posts/Post.action";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const dispatch = useDispatch();
  const { posts,isLoading } = useSelector((store) => store.posts);
  const {token} = useSelector(store=>store.auth)
  useEffect(() => {
    dispatch(getSingleUserPosts(token));
  }, []);
console.log(posts,token);
  return (
  <>
  {/* <div className="main_container"> */}

    <Sidebar/>
  <div className="maindiv">
    <div className="postdiv">
      <PostBar data={posts} loading={isLoading}/>
    </div>
    <div className="chatdiv">
      <Chatbar/>
    </div>
  </div>
  {/* </div> */}
  </>
  )
}

export default Home