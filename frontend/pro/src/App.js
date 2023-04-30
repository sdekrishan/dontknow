import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Home from './Routes/Home';
import {io} from 'socket.io-client'
import Sidebar from './components/Sidebar';
import CheckingRoute from './components/CheckingRoute';
const link = 'http://localhost:5000';
function App() {
  const [messages, setMessages] = useState([]);

// useEffect(()=>{
//   let socket = io(link);
//   socket.emit('setup','ramkrishan')
//   socket.on("connection",()=>{
//     console.log(socket.id)
//   })
// },[])
  return (
    <div className="App">
     <AllRoutes/> 
    </div>
  );
}

export default App;
