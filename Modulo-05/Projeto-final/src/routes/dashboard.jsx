import React, { useState, useEffect } from "react";
import { useLogin } from "@/contexts/authProvider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import GameCard from "@/components/gameCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const { isLoggedIn } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, [isLoggedIn]);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(games.map((game) => game.genre))];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event);
  };

  const filteredGamesByCategory = selectedCategory
    ? filteredGames.filter((game) => game.genre === selectedCategory)
    : filteredGames;

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <>
      {isUserLoggedIn ? (
        <div className="p-5 container space-y-5">
          <h1 className="text-2xl tracking-tight font-bold font-heading">
            Catálogo de jogos
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetFilter();
            }}
            className="flex gap-5"
          >
            <Input
              type="text"
              placeholder="Buscar jogos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-2">
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" type="submit">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="gap-10 w-full mt-5 items-center justify-center  grid grid-cols-auto-fit">
            {filteredGamesByCategory.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.short_description}
                genre={game.genre}
                gamePlataform={game.platform}
                image={game.thumbnail}
                review={game.review}
                id={game.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <section>
          <div className="container min-h-[80svh] px-6 py-12 mx-auto flex items-center gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-primary">Oops!</p>
              <h1 className="mt-3 text-2xl font-semibold font-heading md:text-3xl">
                Erro de autenficação
              </h1>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
