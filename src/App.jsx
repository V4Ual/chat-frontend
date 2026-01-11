import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/LoginScreen";
import ChatMainScreen from "./pages/ChatMainScreen";
import { ProfileSetupScreen } from "./pages/ProfileScreen";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { useEffect } from "react";
import socket from "./Socket";
import SocketContext from "./context/SocketContext";

function App() {
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfileSetupScreen />} />
          <Route path="/chat" element={<ChatMainScreen />} />
          <Route path="/:userID/chat" element={<ChatMainScreen />} />
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
