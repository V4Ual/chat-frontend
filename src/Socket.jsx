import { io } from "socket.io-client";
import { config } from "./Config";

const socket = io(config.SOCKET_URL);

export default socket;
