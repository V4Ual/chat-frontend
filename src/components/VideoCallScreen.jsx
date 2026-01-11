import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  SwitchCamera,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar } from "./Avatar";

export const VideoCallScreen = ({ user, onEnd }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callStatus, setCallStatus] = useState();

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setCallStatus("connected");
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callStatus !== "connected") return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callStatus]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full bg-black relative">
      {/* Remote video (full screen) */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-muted to-muted/50">
        {callStatus === "calling" ? (
          <div className="text-center text-foreground">
            <Avatar src={user.avatar} alt={user.name} size="lg" />
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-muted-foreground mt-2">Calling...</p>
          </div>
        ) : (
          <div className="text-center text-foreground">
            <Avatar src={user.avatar} alt={user.name} size="lg" />
            <p className="text-muted-foreground mt-4">{user.name}'s camera</p>
          </div>
        )}
      </div>

      {/* Self video preview (small) */}
      {isVideoOn && callStatus === "connected" && (
        <div className="absolute top-4 right-4 w-28 h-40 bg-muted rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Your camera</span>
        </div>
      )}

      {/* Call duration */}
      {callStatus === "connected" && (
        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
          <p className="text-white text-sm">{formatDuration(callDuration)}</p>
        </div>
      )}

      {/* Call controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-6 px-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              !isVideoOn ? "bg-white text-black" : "bg-white/20 text-white"
            }`}
          >
            {isVideoOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? "bg-white text-black" : "bg-white/20 text-white"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
            <SwitchCamera className="w-5 h-5" />
          </button>

          <button
            onClick={onEnd}
            className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
