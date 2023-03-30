import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Home from './Routes/Home';
import {io} from 'socket.io-client'
import Login from './Routes/Login';
const link = 'http://localhost:5000'
function App() {
  const [messages, setMessages] = useState([]);

useEffect(()=>{
  let socket = io(link);
  socket.emit('setup','ramkrishan')
  socket.on("connection",()=>{
    console.log(socket.id)
  })
},[])
  return (
    <div className="App">
     {/* <AllRoutes/> */}
     <Login/>
    </div>
  );
}

export default App;
