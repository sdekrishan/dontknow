import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import {io} from 'socket.io-client'
const link = 'http://localhost:8000';
function App() {
  const [messages, setMessages] = useState([]);

useEffect(()=>{
  let socket = io(link);
  socket.emit('setup','ramkrishan')
  socket.on("connect",()=>{
    console.log(socket.id)
    console.log('connected');
  })
  // socket.on("connection",()=>{
  //   console.log('connected');
  // })
},[])
  return (
    <div className="App">
     <AllRoutes/> 
    </div>
  );
}

export default App;
