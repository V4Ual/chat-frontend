import { cn } from "../lib/utils";
import { Avatar } from "./Avatar";
import { MessageStatus } from "./MessageStatus";

/**
 * Individual chat list item
 * Shows avatar, name, last message, time, and unread count
 */
export const ChatListItem = ({ chat, isActive, onClick }) => {
  const { user, lastMessage, lastMessageTime, unreadCount, messages } = chat;
  const lastMsg = messages[messages.length - 1];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3",
        "hover:bg-muted/50 transition-colors duration-200",
        "border-b border-border/50",
        isActive && "bg-muted"
      )}
    >
      {/* User avatar with status */}
      <Avatar
        src={user.profilePic}
        alt={user.name}
        size="md"
        status={user.status}
      />

      {/* Chat info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate">
            {user.name}
          </h3>
          <span
            className={cn(
              "text-xs flex-shrink-0",
              unreadCount > 0
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {lastMessageTime}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-0.5">
          {/* Show tick if last message was sent by user */}
          {lastMsg?.isSent && (
            <MessageStatus status={lastMsg.status} className="flex-shrink-0" />
          )}

          <p className="text-sm text-muted-foreground truncate flex-1">
            {user.status === "typing" ? (
              <span className="text-primary italic">typing...</span>
            ) : (
              lastMessage
            )}
          </p>

          {/* Unread count badge */}
          {unreadCount > 0 && (
            <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
