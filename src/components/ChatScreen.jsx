import { useState, useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { VoiceCallScreen } from "./VoiceCallScreen";
import { VideoCallScreen } from "./VideoCallScreen";
import { UserProfileDrawer } from "./UserProfileDrawer";
import { useMutation } from "@tanstack/react-query";
import { fetchSendMessage } from "../service/ChatService";

/**
 * Individual chat screen with messages
 * Handles message sending and auto-scrolling
 */
export const ChatScreen = ({ chat, onBack, messageList }) => {
  const [messages, setMessages] = useState();
  const [showTyping, setShowTyping] = useState(false);
  const [callType, setCallType] = useState("none");
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages(messageList);
  }, [messageList]);

  useEffect(() => {
    scrollToBottom();
    console.log({ messages });
  }, [messages, showTyping]);

  // // Reset messages when chat changes
  // useEffect(() => {
  //   setMessages(chat.messages);
  // }, [chat.id]);

  const { mutateAsync } = useMutation({
    mutationFn: fetchSendMessage,
  });
  // Handle sending a message
  const handleSend = async (text, attachments) => {
    const prepredMessage = {
      chatId: chat.roomId,
      senderId: localStorage.getItem("_id"),
      message: text,
      receiverId: chat.user._id,
    };

    await mutateAsync(prepredMessage);

    const newMessage = {
      id: `m${Date.now()}`,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Show call screen if in call
  if (callType === "voice") {
    return (
      <VoiceCallScreen user={chat.user} onEnd={() => setCallType("none")} />
    );
  }

  if (callType === "video") {
    return (
      <VideoCallScreen user={chat.user} onEnd={() => setCallType("none")} />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <ChatHeader
        user={chat.user}
        onBack={onBack}
        onVoiceCall={() => setCallType("voice")}
        onVideoCall={() => setCallType("video")}
        onOpenProfile={() => setShowProfile(true)}
      />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto chat-background scrollbar-thin">
        <div className="flex flex-col gap-2 p-3">
          {messages &&
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

          {/* Typing indicator */}
          {showTyping && <TypingIndicator />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <MessageInput onSend={handleSend} />

      {/* User profile drawer */}
      <UserProfileDrawer
        user={chat.user}
        open={showProfile}
        onOpenChange={setShowProfile}
        onVoiceCall={() => setCallType("voice")}
        onVideoCall={() => setCallType("video")}
      />
    </div>
  );
};
