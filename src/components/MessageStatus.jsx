import { Check, CheckCheck } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Message status ticks (sent, delivered, read)
 * Single check = sent, double gray = delivered, double blue = read
 */
export const MessageStatus = ({ status, className }) => {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {status === "sent" && <Check className="w-4 h-4 text-muted-foreground" />}
      {status === "delivered" && (
        <CheckCheck className="w-4 h-4 text-muted-foreground" />
      )}
      {status === "read" && <CheckCheck className="w-4 h-4 text-blue-500" />}
    </span>
  );
};
