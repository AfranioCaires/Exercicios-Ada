import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useLogin } from "@/contexts/authProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function GameCard({
  id,
  title,
  description,
  image,
  genre,
  gamePlataform,
}) {
  const [reviews, setReviews] = useState([]);

  const { isLoggedIn, isAdmin, loginToken } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState("");

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/reviews`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredReviews = data.filter((review) => review.game_id === id);
        setReviews(filteredReviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  function handleDeleteComment(commentId) {
    fetch(
      `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/reviews/${commentId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.success("Comentário deletado com sucesso.");
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== commentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  }
  function handleReviewSubmit(event) {
    event.preventDefault();

    const reviewerToken = loginToken;

    fetch(
      `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/users`
    )
      .then((response) => response.json())
      .then((data) => {
        const user = data.find((user) => user.email === reviewerToken);

        const newReview = {
          id: crypto.randomUUID(),
          game_id: id,
          stars: reviewStars,
          description: reviewText,
          reviewerName: user.name,
          reviewerToken: reviewerToken,
        };

        fetch(
          `https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            toast.success("Avaliação enviada com sucesso.");
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setReviewText("");
            setReviewStars("");
          })
          .catch((error) => {
            console.error("Error submitting review:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  return (
    <Card className="w-[310px] h-[430px] flex flex-col flex-1 justify-between">
      <div className="flex flex-col flex-1 justify-between">
        <CardHeader>
          <div className="flex flex-col gap-5">
            <img src={image} className="rounded-md" alt="imagem de jogo" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{description}</CardDescription>
          <div className="flex gap-2">
            <Badge variant="secondary">{genre}</Badge>
            <Badge variant="secondary">{gamePlataform}</Badge>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Dialog className>
          <DialogTrigger asChild>
            <Button>
              Ver avaliações <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Avaliações</DialogTitle>
              <DialogDescription>
                Veja avaliações feitas por outros usuários. Você também pode
                fazer sua avaliação.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="grid gap-4 py-4 h-96 ">
              {reviews.length === 0 ? (
                <p>
                  Este jogo não possui comentários. Seja o primeiro a comentar.
                </p>
              ) : (
                reviews.map((review) => (
                  <div className="mb-5" key={review.id}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{review.reviewerName}</h3>
                      <span className="flex items-center">
                        {review.stars}
                        <Star className="ml-2 mr-2 h-4 w-4" />

                        {isAdmin() ||
                        (isUserLoggedIn &&
                          review.reviewerToken === loginToken) ? (
                          <Button
                            onClick={() => handleDeleteComment(review.id)}
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Deletar</span>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : null}
                      </span>
                    </div>
                    <p className="mb-4">{review.description}</p>
                    <Separator />
                  </div>
                ))
              )}

              <ScrollBar />
            </ScrollArea>
            <form className="flex flex-col gap-3" onSubmit={handleReviewSubmit}>
              <h3 className="text-1xl font-semibold leading-none tracking-tight mb-2">
                Avaliar
              </h3>
              <Select onValueChange={(event) => setReviewStars(event)}>
                <SelectTrigger>
                  <SelectValue placeholder="Estrelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Digite seu comentário aqui..."
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
              />

              <DialogFooter>
                <Button type="submit" className="mt-4">
                  Enviar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
