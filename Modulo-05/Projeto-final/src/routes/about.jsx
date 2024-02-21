import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <section className="container flex items-center  mt-5 h-[80vh]">
        <div className="flex-1 max-w-6xl ">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl">
                Sobre nós
              </h2>
              <p className="mb-10 text-base mt-6 leading-8 text-muted-foreground">
                Somos uma plataforma entusiasta, fundada com a missão de criar
                um espaço onde jogadores de todas as partes do mundo possam se
                conectar, compartilhar experiências e descobrir os melhores
                jogos disponíveis. Aqui, na nossa plataforma de review de jogos,
                acreditamos que a paixão pelos games vai além do simples
                entretenimento, é uma forma de expressão e uma maneira única de
                vivenciar histórias extraordinárias. Nossa equipe é composta por
                gamers dedicados e entusiastas da indústria, unidos pelo
                objetivo comum de proporcionar informações valiosas e opiniões
                sinceras sobre os mais recentes lançamentos.
              </p>
              <Link to="/">
                <Button>Saiba mais</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
