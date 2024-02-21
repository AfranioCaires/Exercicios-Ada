import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminDataTable() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [publisher, setPublisher] = useState("");
  const [developer, setDeveloper] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [newGame, setNewGame] = useState(null);
  const [filter, setFilter] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editGameUrl, setEditGameUrl] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [editPublisher, setEditPublisher] = useState("");
  const [editDeveloper, setEditDeveloper] = useState("");
  const [editReleaseDate, setEditReleaseDate] = useState("");

  const filteredGames = data.filter((game) => {
    return game.title.toLowerCase().includes(filter.toLowerCase());
  });

  const fetchGames = async () => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/games"
      );
      const games = await response.json();
      setData(games);
    } catch (error) {
      toast.error("Erro ao buscar os jogos.");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/games/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchGames();
      toast.success("Jogo deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar o jogo.");
    }
  };

  const handleEditSave = (id) => {
    fetch(
      `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/games/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          thumbnail: editThumbnail,
          short_description: editDescription,
          game_url: editGameUrl,
          genre: editGenre,
          platform: editPlatform,
          publisher: editPublisher,
          developer: editDeveloper,
          release_date: editReleaseDate,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchGames();
        toast.success("Jogo editado com sucesso.");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Erro ao editar o jogo.");
      });
  };

  const handleSave = async () => {
    try {
      if (newGame) {
        await fetch(
          `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/games/${newGame.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: newGame.id,
              title,
              thumbnail,
              short_description: description,
              game_url: gameUrl,
              genre,
              platform,
              publisher,
              developer,
              release_date: releaseDate,
            }),
          }
        );
      } else {
        await fetch(
          "https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/games",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              thumbnail,
              short_description: description,
              game_url: gameUrl,
              genre,
              platform,
              publisher,
              developer,
              release_date: releaseDate,
            }),
          }
        );
      }
      fetchGames();
      resetForm();
    } catch (error) {
      toast.error("Erro ao salvar o jogo.");
    }
  };

  const openEditDialog = (game) => {
    setEditTitle(game.title);
    setEditThumbnail(game.thumbnail);
    setEditDescription(game.short_description);
    setEditGameUrl(game.game_url);
    setEditGenre(game.genre);
    setEditPlatform(game.platform);
    setEditPublisher(game.publisher);
    setEditDeveloper(game.developer);
    setEditReleaseDate(game.release_date);
  };

  const resetForm = () => {
    setNewGame(null);
    setTitle("");
    setThumbnail("");
    setDescription("");
    setGameUrl("");
    setGenre("");
    setPlatform("");
    setPublisher("");
    setDeveloper("");
    setReleaseDate("");
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:justify-between">
        <h1 className="font-heading font-semibold text-3xl mb-3">
          Painel de jogos
        </h1>
        <div className="flex gap-2">
          <Input
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar jogos"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar jogo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]">
              <DialogHeader>
                <DialogTitle>Adicionar jogo</DialogTitle>
                <DialogDescription>
                  Coloque as informações do seu jogo aqui. Clique em salvar para
                  confirmar a criação do jogo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite o título do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="thumbnail" className="text-right">
                    Thumbnail
                  </Label>
                  <Input
                    id="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a URL da thumbnail"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a descrição do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gameUrl" className="text-right">
                    URL do Jogo
                  </Label>
                  <Input
                    id="gameUrl"
                    value={gameUrl}
                    onChange={(e) => setGameUrl(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a URL do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="genre" className="text-right">
                    Gênero
                  </Label>
                  <Input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite o gênero do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Plataforma
                  </Label>
                  <Input
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a plataforma do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="publisher" className="text-right">
                    Publicadora
                  </Label>
                  <Input
                    id="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a publicadora do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="developer" className="text-right">
                    Desenvolvedora
                  </Label>
                  <Input
                    id="developer"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a desenvolvedora do jogo"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="releaseDate" className="text-right">
                    Data de Lançamento
                  </Label>
                  <Input
                    id="releaseDate"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="col-span-3"
                    placeholder="Digite a data de lançamento do jogo"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Fechar
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    handleSave(), toast.success("Jogo salvo com sucesso.");
                  }}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deletar</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredGames.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDelete(row.id)}
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>{row.platform}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => openEditDialog(row)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[825px]">
                      <DialogHeader>
                        <DialogTitle>Editar jogo</DialogTitle>
                        <DialogDescription>
                          Altere as informações do seu jogo aqui. Clique em
                          salvar para confirmar a edição do jogo.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editTitle" className="text-right">
                            Título
                          </Label>
                          <Input
                            id="editTitle"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Digite o título do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editThumbnail" className="text-right">
                            Thumbnail
                          </Label>
                          <Input
                            id="editThumbnail"
                            value={editThumbnail}
                            onChange={(e) => setEditThumbnail(e.target.value)}
                            placeholder="Digite a URL da thumbnail"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="editDescription"
                            className="text-right"
                          >
                            Descrição
                          </Label>
                          <Textarea
                            id="editDescription"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Digite a descrição do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editGameUrl" className="text-right">
                            URL do Jogo
                          </Label>
                          <Input
                            id="editGameUrl"
                            value={editGameUrl}
                            onChange={(e) => setEditGameUrl(e.target.value)}
                            placeholder="Digite a URL do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editGenre" className="text-right">
                            Gênero
                          </Label>
                          <Input
                            id="editGenre"
                            value={editGenre}
                            onChange={(e) => setEditGenre(e.target.value)}
                            placeholder="Digite o gênero do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editPlatform" className="text-right">
                            Plataforma
                          </Label>
                          <Input
                            id="editPlatform"
                            value={editPlatform}
                            onChange={(e) => setEditPlatform(e.target.value)}
                            placeholder="Digite a plataforma do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editPublisher" className="text-right">
                            Publicadora
                          </Label>
                          <Input
                            id="editPublisher"
                            value={editPublisher}
                            onChange={(e) => setEditPublisher(e.target.value)}
                            placeholder="Digite a publicadora do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="editDeveloper" className="text-right">
                            Desenvolvedora
                          </Label>
                          <Input
                            id="editDeveloper"
                            value={editDeveloper}
                            onChange={(e) => setEditDeveloper(e.target.value)}
                            placeholder="Digite a desenvolvedora do jogo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="editReleaseDate"
                            className="text-right"
                          >
                            Data de Lançamento
                          </Label>
                          <Input
                            id="editReleaseDate"
                            value={editReleaseDate}
                            onChange={(e) => setEditReleaseDate(e.target.value)}
                            placeholder="Digite a data de lançamento do jogo"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Fechar
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={() => {
                            handleEditSave(row.id);
                          }}
                        >
                          Salvar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
