import { AppWindow, Home, LogOut, Menu, Settings, User } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useLogin } from "@/contexts/authProvider";
import { toast } from "sonner";

export function LoginMenu() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdmin } = useLogin();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isUserLoggedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-46">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Navegação</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <AppWindow className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              {isAdmin() && (
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/adminDashboard");
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/");
                  toast.success("Log-out realizado com sucesso.");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log-out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
