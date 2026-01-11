import { cn } from "../lib/utils";

export const Avatar = ({ src, alt, size = "md", status, className }) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const statusSizeClasses = {
    sm: "w-2.5 h-2.5 right-0 bottom-0",
    md: "w-3 h-3 right-0.5 bottom-0.5",
    lg: "w-4 h-4 right-1 bottom-1",
  };

  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover ring-2 ring-background",
          sizeClasses[size]
        )}
      />
      {status && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-background",
            statusSizeClasses[size],
            status === "online" && "bg-whatsapp-online",
            status === "offline" && "bg-muted-foreground",
            status === "typing" && "bg-whatsapp-online animate-pulse-subtle"
          )}
        />
      )}
    </div>
  );
};
