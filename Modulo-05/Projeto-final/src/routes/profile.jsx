import { useLogin } from "@/contexts/authProvider";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Profile() {
  const { isLoggedIn } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isUserLoggedIn ? (
        <div>
          <h1> Hello</h1>
          <p> isso é um teste</p>
        </div>
      ) : (
        <section>
          <div className="container min-h-[80svh] px-6 py-12 mx-auto flex items-center gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-primary">Oops!</p>
              <h1 className="mt-3 text-2xl font-semibold font-heading md:text-3xl">
                Erro de autentificação
              </h1>
              <p className="mt-4 text-muted-foreground">
                Você precisa realizar o login para acessar essa página.
              </p>
              <Link to="/login">
                <Button className="mt-4">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Fazer login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
