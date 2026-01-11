import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getTokenForLocalStorage,
  setTokenLocalStorage,
} from "../service/extraServices";
import { login } from "../services/AxiosServer";
import { MessageCircle, Phone, ArrowRight, Shield, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import { ProfileSetupScreen } from "./ProfileScreen";
import ErrorMessage from "../components/Error";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneDone, setIsPhoneDone] = useState(false);
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    setIsLoading(true);
    setIsPhoneDone(true);
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // allow only digits up to 20
    if (/^\d{0,20}$/.test(value)) {
      setPhoneNumber(value);
      setErrors({ ...errors, phone: "" });
    }
  };

  return !isPhoneDone ? (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <MessageCircle className="w-8 h-8" />
          <h1 className="text-xl font-bold">WhatsApp</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          {/* Welcome text */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Enter your phone number
            </h2>
            <p className="text-muted-foreground text-sm">
              WhatsApp will need to verify your phone number.
            </p>
          </div>

          {/* Phone form */}
          <div className="space-y-6">
            <div className="flex gap-2">
              {/* Country code */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={cn(
                  "w-24 px-3 py-3 rounded-lg",
                  "bg-muted text-foreground",
                  "border border-border",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
                <option value="+61">+61</option>
                <option value="+81">+81</option>
              </select>

              {/* Phone number */}
              <input
                type="tel"
                value={phoneNumber}
                maxLength={20}
                placeholder="Phone number"
                onChange={(e) => handlePhoneChange(e)}
                pattern="[0-9]{10}"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                inputmode="numeric"
                className={cn(
                  "flex-1 px-4 py-3 rounded-lg",
                  "bg-muted text-foreground placeholder:text-muted-foreground",
                  "border border-border",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
              />
            </div>
            <ErrorMessage error={errors?.phone} />
            {/* Carrier charges notice */}
            <p className="text-xs text-muted-foreground text-center">
              Carrier charges may apply
            </p>

            {/* Submit button */}
            <button
              onClick={() => handleSubmit()}
              disabled={!phoneNumber || isLoading}
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
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Security info */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>Your personal messages are end-to-end encrypted</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>Your privacy and security are important to us</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        <p>from Meta</p>
      </footer>
    </div>
  ) : (
    <ProfileSetupScreen phoneNumber={phoneNumber} />
  );
};

export default LoginScreen;
