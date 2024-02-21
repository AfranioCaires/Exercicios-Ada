import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouteError } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-provider";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <section>
          <div className="container min-h-[80svh] px-6 py-12 mx-auto flex items-center gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-primary">{error.status}</p>
              <h1 className="mt-3 text-2xl font-semibold font-heading md:text-3xl">
                Página não encontrada
              </h1>
              <p className="mt-4 text-muted-foreground">
                Desculpe, a página que você está procurando não existe.
              </p>
              <Link to="/">
                <Button className="mt-4">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Ir para o início
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ThemeProvider>
    </>
  );
}
