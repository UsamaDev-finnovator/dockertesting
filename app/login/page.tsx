"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default function LoginPage() {
  return (
    <Provider store={store}>
      <div className="grid min-h-svh lg:grid-cols-2 ">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <img
                src="/assets/FULL-LOGO.png"
                alt="Logo"
                className="h-16 w-16 object-contain transition-all duration-300"
              />
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/assets/skyline.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </Provider>
  );
}
