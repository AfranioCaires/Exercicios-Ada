import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/theme-provider";
import { LoginProvider } from "@/contexts/authProvider";

export default function Root() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <LoginProvider>
          <Header />
          <Outlet />
          <Toaster />
          <Footer />
        </LoginProvider>
      </ThemeProvider>
    </>
  );
}
