import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  const includedFeatures = [
    "Receba um jogo AAA mensalmente",
    "Cupons de desconto em lojas parceiras",
    "Receba acesso a nossa Newsletter",
    "Acesso a betas e demos de jogos de empresas parceiras",
  ];
  return (
    <>
      <section className="space-y-6 pb-2 pt-8 md:pb-4 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Novos jogos adiconados
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Descubra novos jogos
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Descubra os melhores jogos de videogames, novos e futuros, aqui.
            Veja e faça avaliações nos seus jogos favoritos.
          </p>
          <div className="space-x-4">
            <Link to="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Acessar a Plataforma
            </Link>
            <Link
              to={"/about"}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Sobre
            </Link>
          </div>
        </div>
      </section>
      <Separator className="container my-4" />
      <div className="py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl">
              Conheça o BrowserPass
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Descubra seu próximo jogo favorito. Quer você jogue no console, no
              PC ou em todos os outros dispositivos. Cancele a qualquer momento
              para interromper cobranças futuras.
            </p>
          </div>
          <div className="mt-16 sm:mt-20 lg:mx-0 items-center lg:flex">
            <div className="gap-4 lg:flex-auto">
              <h3 className="text-2xl tracking-tight font-heading">
                Assinatura
              </h3>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Eleve sua experiência de jogo a outro patamar ao receber
                gratuitamente o título mais aclamado do mês. Embarque em uma
                jornada emocionante com o jogo conquistou que corações e mentes.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6">
                  Benefícios
                </h4>
                <div className="h-px flex-auto" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none " aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle>BrowserPass</CardTitle>
                  <CardDescription>
                    Plano mensal. Cancele a qualquer momento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex flex-col items-start justify-center">
                    <span className="text-5xl font-bold tracking-tight font-heading mb-4">
                      R$50
                    </span>
                    <a href="#" className={cn(buttonVariants({ size: "lg" }))}>
                      Assinar
                    </a>
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="mt-6 text-xs leading-5 text-muted-foreground">
                    Ao assinar, esteja ciente de possíveis taxas locais conforme
                    sua região.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Separator className="container my-4" />
      <section className="container flex flex-col gap-2 py-6">
        <h2 className="text-2xl font-bold tracking-tight font-heading">
          Perguntas frequentes
        </h2>
        <div className=""></div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Vocês vendem jogos?</AccordionTrigger>
            <AccordionContent>
              Não, nós não vendemos jogos. Somos uma plataforma dedicada
              exclusivamente à avaliação e análise de jogos. Nosso objetivo é
              fornecer informações detalhadas e imparciais sobre diferentes
              títulos, ajudando os jogadores a tomar decisões informadas antes
              de adquirir um jogo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Como posso acessar as avaliações de jogos na plataforma?
            </AccordionTrigger>
            <AccordionContent>
              Para acessar as avaliações de jogos em nossa plataforma, basta
              navegar pelo nosso site e utilizar a barra de pesquisa ou explorar
              as categorias disponíveis. Cada análise é elaborada por nossa
              equipe de especialistas, abordando aspectos como jogabilidade,
              gráficos, história e outros elementos relevantes para oferecer uma
              visão abrangente do jogo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Como posso contribuir com minhas próprias avaliações de jogos?
            </AccordionTrigger>
            <AccordionContent>
              Atualmente, aceitamos contribuições de avaliações de usuários. Se
              você gostaria de compartilhar sua experiência com um jogo, pode se
              cadastrar em nossa plataforma e seguir as orientações para enviar
              sua análise. Valorizamos a diversidade de opiniões e experiências
              dos jogadores.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
