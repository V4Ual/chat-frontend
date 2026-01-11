import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar } from "./Avatar";

export const VoiceCallScreen = ({ user, onEnd }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState();

  useEffect(() => {
    // Simulate call connecting after 2 seconds
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
    <div className="flex flex-col h-full bg-gradient-to-b from-primary to-primary/80">
      {/* User info */}
      <div className="flex-1 flex flex-col items-center justify-center text-primary-foreground">
        <Avatar src={user.avatar} alt={user.name} size="lg" />
        <h2 className="text-2xl font-semibold mt-6">{user.name}</h2>
        <p className="text-primary-foreground/80 mt-2">
          {callStatus === "calling"
            ? "Calling..."
            : formatDuration(callDuration)}
        </p>
      </div>

      {/* Call controls */}
      <div className="pb-12 pt-8 px-6">
        <div className="flex justify-center gap-8">
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isSpeakerOn
                ? "bg-primary-foreground text-primary"
                : "bg-primary-foreground/20 text-primary-foreground"
            }`}
          >
            <Volume2 className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted
                ? "bg-primary-foreground text-primary"
                : "bg-primary-foreground/20 text-primary-foreground"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={onEnd}
            className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
