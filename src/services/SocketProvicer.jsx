import React, { createContext, useContext, useMemo } from "react";
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket =io('http://localhost:3001/');
  return socket;
};

// export const SocketProvider = (props) => {
//   const socket = useMemo(() => io('http://localhost:3001/'), []);
//   console.log(socket);
  
//   return (
//     <SocketContext.Provider value={socket}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };
