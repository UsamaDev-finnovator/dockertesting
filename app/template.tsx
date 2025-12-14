"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/ui/Loader";
const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={"GetStartedPage"}>
      <Suspense fallback={<Loader size={350} />}>{children} <Toaster /></Suspense>
    </I18nextProvider>
  );
};

export default Template;
