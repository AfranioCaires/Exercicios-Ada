import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="container flex justify-between items-center py-8 gap-10">
        <div className="flex flex-wrap">
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
          </ul>
        </div>

        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex justify-center space-x-4 lg:mt-0">
              <a href={"https://github.com/afraniocaires"}>
                <Github />
              </a>
              <a href={"https://linkedin.com/in/afraniocaires"}>
                <Linkedin />
              </a>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-70">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/afraniocaires.png" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@afraniocaires</h4>
                <p className="text-sm">Desenvolvedor Front-end.</p>
                <div className="flex items-center pt-2">
                  <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    <a href="mailto: afraniomcaires@gmail.com">
                      afraniomcaires@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="pb-5">
        <p className="text-center">
          {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
