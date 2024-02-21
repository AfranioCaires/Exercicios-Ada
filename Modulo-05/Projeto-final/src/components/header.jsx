import { Gamepad2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { LoginMenu } from "./loginMenu";

export default function Header() {
  return (
    <>
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <Link className="flex items-center space-x-2" to="/">
              <Gamepad2 className="h-6 w-6" />
              <span className="inline-block font-semibold">
                BestBrowserGames
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LoginMenu />
          </div>
        </div>
      </header>
    </>
  );
}
