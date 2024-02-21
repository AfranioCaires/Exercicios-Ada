import React, { useState, useEffect } from "react";
import { useLogin } from "@/contexts/authProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import AdminDataTable from "../components/adminDataTable";

export default function AdminDashboard() {
  const { isLoggedIn, isAdmin } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isAdmin() ? (
        <div className="container flex flex-col gap-5 mt-5">
          <AdminDataTable />
        </div>
      ) : (
        <section>
          <div className="container min-h-[80svh] px-6 py-12 mx-auto flex items-center gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-primary">Oops!</p>
              <h1 className="mt-3 text-2xl font-semibold font-heading md:text-3xl">
                Erro de autorização
              </h1>
              <p className="mt-4 text-muted-foreground">
                Você precisa ser administrador para acessar essa página.
              </p>
              <Link to="/">
                <Button className="mt-4">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Ir para o início
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
