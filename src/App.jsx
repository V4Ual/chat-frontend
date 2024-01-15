// src/App.jsx
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Registration from "./pages/Registration"; // Make sure to import your Registration component
import ChatScreen from "./pages/chatScreen";
import Login from "./pages/LoginScreen";

function App() {

  const isLogin = true


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path='/:userID'>

        <Route path="chat" element={<ChatScreen />} />

      </Route>
    </Routes>
  );
}

export default App;
