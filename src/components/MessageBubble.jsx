import { cn } from "../lib/utils";
import { MessageStatus } from "./MessageStatus";
import { FileText, Download } from "lucide-react";

/**
 * Message bubble component
 * Sent messages: green, right-aligned
 * Received messages: white, left-aligned
 */
export const MessageBubble = ({ message }) => {
  const { text, timestamp, isSent, status, attachments } = message;

  return (
    <div
      className={cn(
        "flex w-full message-bubble",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[75%] sm:max-w-[65%] shadow-sm overflow-hidden",
          isSent
            ? "bg-whatsapp-sent rounded-2xl rounded-tr-sm"
            : "bg-whatsapp-received rounded-2xl rounded-tl-sm",
          attachments && attachments.length > 0 ? "" : "px-3 py-2"
        )}
      >
        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className="flex flex-col gap-1">
            {attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === "image" && attachment.preview ? (
                  <img
                    src={attachment.preview}
                    alt="Shared image"
                    className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-background/50 m-1 rounded-lg">
                    <div className="p-2 rounded-full bg-primary/20">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {attachment.name || "Document"}
                      </p>
                      <p className="text-xs text-muted-foreground">Document</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-background transition-colors">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {text && (
              <div className="px-3 py-2">
                <p className="text-sm leading-relaxed text-foreground break-words">
                  {text}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Message text (when no attachments) */}
        {(!attachments || attachments.length === 0) && (
          <p className="text-sm leading-relaxed text-foreground break-words">
            {text}
          </p>
        )}

        {/* Timestamp and status */}
        <div
          className={cn(
            "flex items-center gap-1 px-3 pb-2",
            isSent ? "justify-end" : "justify-start",
            attachments && attachments.length > 0 && !text ? "pt-1" : "mt-1"
          )}
        >
          <span className="text-[10px] text-muted-foreground">{timestamp}</span>
          {isSent && <MessageStatus status={status} />}
        </div>

        {/* Bubble tail */}
        <div
          className={cn(
            "absolute top-0 w-3 h-3",
            isSent
              ? "right-[-6px] bg-whatsapp-sent"
              : "left-[-6px] bg-whatsapp-received",
            isSent
              ? "[clip-path:polygon(0_0,100%_0,0_100%)]"
              : "[clip-path:polygon(100%_0,0_0,100%_100%)]"
          )}
        />
      </div>
    </div>
  );
};
