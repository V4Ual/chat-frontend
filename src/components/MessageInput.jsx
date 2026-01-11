import { useState, KeyboardEvent, useRef } from "react";
import {
  Send,
  Smile,
  Paperclip,
  Mic,
  X,
  FileText,
  Image,
  Camera,
} from "lucide-react";
import { cn } from "../lib/utils";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

/**
 * Message input component with emoji, attachment, and send buttons
 * Supports Enter key to send
 */
export const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e, type) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = [];
      Array.from(files).forEach((file) => {
        const attachment = { file, type };
        if (type === "image" && file.type.startsWith("image/")) {
          attachment.preview = URL.createObjectURL(file);
        }
        newAttachments.push(attachment);
      });
      setAttachments((prev) => [...prev, ...newAttachments]);
    }
    setShowAttachMenu(false);
    // Reset input
    if (e.target) e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const newAttachments = [...prev];
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  return (
    <div className="bg-muted border-t border-border">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 p-3 pb-0 overflow-x-auto">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 rounded-lg overflow-hidden bg-background border border-border"
            >
              {attachment.type === "image" && attachment.preview ? (
                <img
                  src={attachment.preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover"
                />
              ) : (
                <div className="w-16 h-16 flex flex-col items-center justify-center p-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="text-[10px] text-muted-foreground truncate w-full text-center mt-1">
                    {attachment.file.name.slice(0, 8)}...
                  </span>
                </div>
              )}
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-1 -right-1 p-1 bg-destructive text-destructive-foreground rounded-full shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 p-3">
        {/* Emoji button */}
        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
          <PopoverTrigger asChild>
            <button
              className="p-2 rounded-full text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
              aria-label="Emoji"
            >
              <Smile className="w-6 h-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            className="w-auto p-0 border-none shadow-xl"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={Theme.AUTO}
              width={320}
              height={400}
              searchPlaceholder="Search emoji..."
              previewConfig={{ showPreview: false }}
            />
          </PopoverContent>
        </Popover>

        {/* Attachment button */}
        <Popover open={showAttachMenu} onOpenChange={setShowAttachMenu}>
          <PopoverTrigger asChild>
            <button
              className="p-2 rounded-full text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="w-6 h-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-48 p-2">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="p-2 rounded-full bg-purple-500/20 text-purple-500">
                  <Image className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Photos</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-500">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Document</span>
              </button>
              <button
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="p-2 rounded-full bg-pink-500/20 text-pink-500">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Camera</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
          multiple
          onChange={(e) => handleFileSelect(e, "document")}
        />
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e, "image")}
        />

        {/* Input field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className={cn(
              "w-full px-4 py-3 rounded-full",
              "bg-background text-foreground placeholder:text-muted-foreground",
              "border-none outline-none",
              "focus:ring-2 focus:ring-primary/20",
              "transition-all duration-200"
            )}
          />
        </div>

        {/* Send or Mic button */}
        {message.trim() || attachments.length > 0 ? (
          <button
            onClick={handleSend}
            className={cn(
              "p-3 rounded-full",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
              "shadow-md hover:shadow-lg",
              "transform active:scale-95"
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            className={cn(
              "p-3 rounded-full",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
              "shadow-md"
            )}
            aria-label="Voice message"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
