import { io } from "socket.io-client";
import { config } from "./constants";

const isBrowser = typeof window !== "undefined";

console.log(config.socketUrl);
export const socket = isBrowser ? io(config.socketUrl) : {}; 