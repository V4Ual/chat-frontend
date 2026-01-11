import { useState } from "react";
import { Search, MoreVertical, MessageCirclePlus, Users } from "lucide-react";
import { Avatar } from "./Avatar";
import { ChatListItem } from "./ChatListItem";
import { currentUser } from "../data/dummyData";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchGetUserDetails } from "../service/UserService";

/**
 * Chat list screen showing all conversations
 * Includes header with profile and search functionality
 */
export const ChatList = ({
  chats,
  activeChatId,
  onSelectChat,
  onOpenContacts,
  pendingRequestsCount = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchGetUserDetails,
  });

  // // Filter chats based on search query
  // const filteredChats =
  //   chats.filter(
  //     (chat) => chat
  //     // chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   ) || [];

  // console.log({ chats });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          {data && (
            <Avatar
              src={
                data?.data?.profilePic ||
                "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80"
              }
              alt="Your profile"
              size="sm"
            />
          )}
          <h1 className="text-xl font-bold">WhatsApp</h1>
        </div>

        <div className="flex items-center gap-1">
          {/* Contacts button */}
          <button
            onClick={onOpenContacts}
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors relative"
            aria-label="Contacts"
          >
            <Users className="w-5 h-5" />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                {pendingRequestsCount}
              </span>
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
            aria-label="New chat"
          >
            <MessageCirclePlus className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Search bar */}
      <div className="p-2 bg-muted">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg",
              "bg-background text-foreground placeholder:text-muted-foreground",
              "border-none outline-none",
              "focus:ring-2 focus:ring-primary/20",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {chats && chats.length > 0 ? (
          chats.map((chat, index) => (
            <ChatListItem
              key={index}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => onSelectChat(chat)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <MessageCirclePlus className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-center">No chats found</p>
            <button
              onClick={onOpenContacts}
              className={cn(
                "mt-4 flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-primary text-primary-foreground text-sm font-medium",
                "hover:bg-whatsapp-dark transition-colors"
              )}
            >
              <Users className="w-4 h-4" />
              Find contacts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
