import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { Avatar } from "./Avatar";

export const ChatHeader = ({
  user,
  onBack,
  onVoiceCall,
  onVideoCall,
  onOpenProfile,
}) => {
  const getStatusText = () => {
    switch (user.status) {
      case "online":
        return "online";
      case "typing":
        return "typing...";
      case "offline":
        return `last seen ${user.lastSeen || "recently"}`;
    }
  };

  return (
    <header className="flex items-center gap-3 px-2 py-2 bg-primary text-primary-foreground shadow-md">
      {/* Back button */}
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* User avatar - clickable to open profile */}
      <button
        onClick={onOpenProfile}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        <Avatar
          src={user.profilePic}
          alt={user.name}
          size="sm"
          status={user.status}
        />

        {/* User info */}
        <div className="flex-1 min-w-0 text-left">
          <h2 className="font-semibold truncate">{user.name}</h2>
          <p className="text-xs text-primary-foreground/80 truncate">
            {getStatusText()}
          </p>
        </div>
      </button>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onVideoCall}
          className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          aria-label="Video call"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          onClick={onVoiceCall}
          className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          aria-label="Voice call"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenProfile}
          className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
