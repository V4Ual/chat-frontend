import { useEffect, useState } from "react";
import { Search, ArrowLeft, UserPlus, Users, Clock } from "lucide-react";
import { Avatar } from "./Avatar";
import { cn } from "../lib/utils";

/**
 * Contacts screen with user search and friend requests
 */
export const ContactsScreen = ({
  allUsers,
  contacts,
  friendRequests,
  onBack,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  onStartChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [sentRequests, setSentRequests] = useState([]);

  const contactIds = contacts.map((c) => c.id);

  // Filter users not in contacts and match search
  const searchResults = allUsers.filter((user) => {
    const isNotContact = !contactIds.includes(user.id);
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.includes(searchQuery);
    return isNotContact && (searchQuery ? matchesSearch : true);
  });

  // Incoming requests
  const incomingRequests = friendRequests?.filter((r) => r.type === "incoming");

  const handleSendRequest = (user) => {
    onSendRequest(user);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-2 py-3 bg-primary text-primary-foreground">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Contacts</h1>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-border bg-background">
        <button
          onClick={() => setActiveTab("search")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
            activeTab === "search"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Users className="w-4 h-4" />
          Find Users
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative",
            activeTab === "requests"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Clock className="w-4 h-4" />
          Requests
          {/* {incomingRequests?.length > 0 && (
            <span className="absolute top-2 right-4 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {incomingRequests?.length}
            </span>
          )} */}
        </button>
      </div>

      {activeTab === "search" ? (
        <>
          {/* Search bar */}
          <div className="p-3 bg-muted">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or phone"
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

          {/* My Contacts Section */}
          {/* <div className="px-4 py-2 bg-muted/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              My Contacts ({contacts.length})
            </h3>
          </div>

          <div className="overflow-y-auto scrollbar-thin max-h-[200px]">
            {contacts.map((user) => (
              <button
                key={user.id}
                onClick={() => onStartChat(user)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border/50"
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="md"
                  status={user.status}
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.about}
                  </p>
                </div>
              </button>
            ))}
          </div> */}

          {/* Search Results / New Users */}
          <div className="px-4 py-2 bg-muted/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {searchQuery ? "Search Results" : "Suggested Users"} (
              {searchResults.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => {
                // const hasSentRequest = sentRequests.includes(user.id);
                // const hasPendingRequest = friendRequests?.some(
                //   (r) => r.user.id === user.id
                // );

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border/50"
                  >
                    <Avatar
                      src={user.profilePic}
                      alt={user.name}
                      size="md"
                      status={user.status}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">
                        {user.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.about}
                      </p>
                    </div>
                    {false ? (
                      <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm">
                        Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSendRequest(user)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                          "bg-primary text-primary-foreground text-sm font-medium",
                          "hover:bg-whatsapp-dark transition-colors",
                          "active:scale-95"
                        )}
                      >
                        <UserPlus className="w-4 h-4" />
                        Add
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mb-3 opacity-50" />
                <p>No users found</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Requests Tab */
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {friendRequests?.length > 0 ? (
            <>
              <div className="px-4 py-2 bg-muted/50">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Incoming Requests ({friendRequests?.length})
                </h3>
              </div>

              {friendRequests?.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border-b border-border/50 animate-fade-in"
                >
                  <Avatar
                    src={request.image}
                    alt={request.name}
                    size="md"
                    status={request.status}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">
                      {request.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {request.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAcceptRequest(request)}
                      className={cn(
                        "px-4 py-1.5 rounded-full",
                        "bg-primary text-primary-foreground text-sm font-medium",
                        "hover:bg-whatsapp-dark transition-colors",
                        "active:scale-95"
                      )}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onRejectRequest(request)}
                      className={cn(
                        "px-4 py-1.5 rounded-full",
                        "bg-muted text-muted-foreground text-sm font-medium",
                        "hover:bg-destructive hover:text-destructive-foreground transition-colors",
                        "active:scale-95"
                      )}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
              <Clock className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-center">No pending requests</p>
              <p className="text-sm text-center mt-1 opacity-70">
                When someone sends you a request, it will appear here
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
