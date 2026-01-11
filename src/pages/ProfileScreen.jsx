import { useState } from "react";
import { Camera, User, Mail, FileText, ArrowRight, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { login, registration } from "../services/AxiosServer";
import { setTokenLocalStorage } from "../service/extraServices";
import { useNavigate } from "react-router-dom";
import { useLoginHook } from "../hooks/Login";

export const ProfileSetupScreen = ({ phoneNumber }) => {
  const {
    registerData,
    handleImageUpload,
    handleOnChange,
    handleSubmit,
    avatar,
    isLoading,
    sendRequest,
  } = useLoginHook(phoneNumber);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold">Profile info</h1>
          <p className="text-sm text-primary-foreground/80">
            Please provide your name and an optional profile photo
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center p-6 pt-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer group">
                <div
                  className={cn(
                    "w-32 h-32 rounded-full overflow-hidden",
                    "bg-muted border-2 border-dashed border-border",
                    "flex items-center justify-center",
                    "transition-all duration-300",
                    "group-hover:border-primary group-hover:bg-primary/5"
                  )}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "absolute bottom-0 right-0",
                    "w-10 h-10 rounded-full",
                    "bg-primary text-primary-foreground",
                    "flex items-center justify-center",
                    "shadow-lg",
                    "transition-transform duration-200",
                    "group-hover:scale-110"
                  )}
                >
                  <Camera className="w-5 h-5" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={registerData?.name || ""}
                onChange={(e) => handleOnChange(e)}
                placeholder="Enter your name"
                maxLength={25}
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "bg-muted text-foreground placeholder:text-muted-foreground",
                  "border border-border",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  "transition-all duration-200"
                )}
              />
              <p className="text-xs text-muted-foreground text-right">
                {name.length}/25
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email (optional)
              </label>
              <input
                type="email"
                name="email"
                value={registerData?.email || ""}
                onChange={(e) => handleOnChange(e)}
                placeholder="Enter your email"
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "bg-muted text-foreground placeholder:text-muted-foreground",
                  "border border-border",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  "transition-all duration-200"
                )}
              />
            </div>

            {/* Description/About Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                About (optional)
              </label>
              <textarea
                value={registerData?.description || ""}
                onChange={(e) => handleOnChange(e)}
                placeholder="Hey there! I am using WhatsApp"
                maxLength={140}
                rows={3}
                name="description"
                className={cn(
                  "w-full px-4 py-3 rounded-lg resize-none",
                  "bg-muted text-foreground placeholder:text-muted-foreground",
                  "border border-border",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  "transition-all duration-200"
                )}
              />
              <p className="text-xs text-muted-foreground text-right">
                {registerData?.description?.length}/140
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => handleSubmit()}
              disabled={!registerData?.name || isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2",
                "px-6 py-3 rounded-lg font-semibold",
                "bg-primary text-primary-foreground",
                "hover:bg-whatsapp-dark transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-md hover:shadow-lg",
                "transform active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Continue
                </>
              )}
            </button>
          </div>

          {/* Info text */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This is how your name and photo will appear to your contacts
          </p>
        </div>
      </main>
    </div>
  );
};
