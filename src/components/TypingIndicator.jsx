/**
 * Typing indicator with animated dots
 * Shows when a user is typing
 */
export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="bg-whatsapp-received rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
};
