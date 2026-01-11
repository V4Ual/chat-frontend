import { useContext, useEffect, useState } from "react";
import { ChatList } from "../components/ChatList";
import { ContactsScreen } from "../components/ContactsScreen";
import {
  chats as initialChats,
  allUsers,
  users as initialContacts,
} from "../data/dummyData";
import { useToast } from "../hooks/use-toast";
import { ChatScreen } from "../components/ChatScreen";
import { useUserList } from "../hooks/UserList";
import { useSendRequest } from "../hooks/SendRequest";
import { useRequestList } from "../hooks/RequestList";
import { useChatUserList } from "../hooks/ChatUserList";
import { useChatList } from "../hooks/ChatMessageList";
import SocketContext from "../context/SocketContext";

const ChatMainScreen = () => {
  const { userList } = useUserList();
  const { isLoading, userRequestList, refetch } = useRequestList();
  const { isPending, sendRequest, acceptRequest, declineRequest } =
    useSendRequest(refetch);
  const { chatUserList } = useChatUserList();
  const {
    currentScreen,
    handleSelectChat,
    handleOpenContacts,
    selectedChat,
    handleBackToChats,
    setCurrentScreen,
    chatMessageList,
  } = useChatList();

  const [contacts, setContacts] = useState(initialContacts);
  const [friendRequests, setFriendRequests] = useState();
  const { toast } = useToast();

  // const handleOpenContacts = () => {
  //   setCurrentScreen("contacts");
  // };

  const incomingRequestsCount = friendRequests?.filter(
    (r) => r.type === "incoming"
  ).length;

  const DesktopEmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center bg-muted/20 text-muted-foreground">
      <div className="text-center p-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            viewBox="0 0 303 172"
            width="180"
            className="text-muted-foreground/40"
          >
            <path
              fill="currentColor"
              d="M229.565 160.229c32.647-25.076 50.135-59.336 50.135-95.429C279.7 29.171 216.752 0 139.85 0 62.947 0 0 29.171 0 65.8c0 36.199 62.947 65.8 139.85 65.8 17.996 0 35.128-1.915 50.716-5.38l62.147 34.009-23.148-34zm-89.715-25.228c-62.947 0-114.65-23.569-114.65-52.601s51.703-52.6 114.65-52.6 114.65 23.569 114.65 52.6-51.703 52.601-114.65 52.601z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-light mb-3 text-foreground/80">
          WhatsApp Web
        </h2>
        <p className="text-sm max-w-md text-muted-foreground leading-relaxed">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </span>
          End-to-end encrypted
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-muted/30">
      {/* Desktop/Tablet: Split view */}
      <div className="hidden md:flex h-full w-full">
        {/* Sidebar - Chat list or Contacts */}
        <div className="w-[350px] lg:w-[400px] border-r border-border h-full flex-shrink-0 bg-background">
          {currentScreen === "contacts" ? (
            <ContactsScreen
              allUsers={userList}
              contacts={contacts}
              friendRequests={userRequestList}
              onBack={() => setCurrentScreen("chats")}
              onSendRequest={sendRequest}
              onAcceptRequest={acceptRequest}
              onRejectRequest={declineRequest}
              // onStartChat={handleStartChatFromContacts}
            />
          ) : (
            <ChatList
              chats={chatUserList}
              activeChatId={selectedChat?.id}
              onSelectChat={handleSelectChat}
              onOpenContacts={handleOpenContacts}
              pendingRequestsCount={incomingRequestsCount}
            />
          )}
        </div>

        {/* Chat screen or empty state */}
        <div className="flex-1 h-full">
          {selectedChat ? (
            <ChatScreen
              messageList={chatMessageList}
              chat={selectedChat}
              onBack={handleBackToChats}
            />
          ) : (
            <DesktopEmptyState />
          )}
        </div>
      </div>

      {/* Mobile: Single view */}
      <div className="md:hidden h-full">
        {currentScreen === "chat" && selectedChat ? (
          <ChatScreen
            messageList={chatMessageList}
            chat={selectedChat}
            onBack={handleBackToChats}
          />
        ) : currentScreen === "contacts" ? (
          <ContactsScreen
            allUsers={userList}
            contacts={contacts}
            friendRequests={userRequestList}
            onBack={() => setCurrentScreen("chats")}
            onSendRequest={sendRequest}
            onAcceptRequest={acceptRequest}
            onRejectRequest={declineRequest}
            // onStartChat={handleStartChatFromContacts}
          />
        ) : (
          <ChatList
            chats={chatUserList}
            activeChatId={selectedChat?.id}
            onSelectChat={handleSelectChat}
            onOpenContacts={handleOpenContacts}
            pendingRequestsCount={incomingRequestsCount}
          />
        )}
      </div>
    </div>
  );
};

export default ChatMainScreen;
