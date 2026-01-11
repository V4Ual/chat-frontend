import {
  X,
  Phone,
  Video,
  Bell,
  BellOff,
  Ban,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "../components/ui/drawer";

export const UserProfileDrawer = ({
  user,
  open,
  onOpenChange,
  onVoiceCall,
  onVideoCall,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="relative pb-0">
          <DrawerClose className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-6">
          {/* Profile header */}
          <div className="flex flex-col items-center py-6">
            <Avatar src={user.avatar} alt={user.name} size="lg" />
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {user.status === "online"
                ? "Online"
                : `Last seen ${user.lastSeen || "recently"}`}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-8 py-4 border-b border-border">
            <button
              onClick={() => {
                onVoiceCall();
                onOpenChange(false);
              }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Audio</span>
            </button>
            <button
              onClick={() => {
                onVideoCall();
                onOpenChange(false);
              }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Video</span>
            </button>
          </div>

          {/* User info */}
          <div className="py-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">About</p>
            <p className="text-sm">
              {user.about || "Hey there! I am using WhatsApp."}
            </p>
          </div>

          <div className="py-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <p className="text-sm">{user.phone || "+1 234 567 8900"}</p>
          </div>

          {/* Settings */}
          <div className="py-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-full flex items-center gap-4 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
            >
              {isMuted ? (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Bell className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="flex-1 text-left">
                {isMuted ? "Unmute notifications" : "Mute notifications"}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center gap-4 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors text-destructive">
              <Ban className="w-5 h-5" />
              <span className="flex-1 text-left">Block {user.name}</span>
            </button>

            <button className="w-full flex items-center gap-4 py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors text-destructive">
              <Trash2 className="w-5 h-5" />
              <span className="flex-1 text-left">Delete chat</span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
