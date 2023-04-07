import Chatbar from "../components/Chatbar";
import PostBar from "../components/PostBar";
import Sidebar from "../components/Sidebar";
import './Styles/Home.css'
const Home = () => {
  return (
  <>
  <div className="maindiv">
    <div className="sidebar">
      <Sidebar/>
    </div>
    <div className="postdiv">
      <PostBar/>
    </div>
    <div className="chatdiv">
      <Chatbar/>
    </div>
  </div>
  </>
  )
}

export default Home