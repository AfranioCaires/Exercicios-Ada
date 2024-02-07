import "./App.css";
import Comment from "./components/comment/comment";
import CreateComment from "./components/createComment/createComment";

const commentsArray = [
  {
    id: "1",
    user: "Tyler Joseph",
    content:
      "Roubaram o rádio do meu carro e agora eu tenho que me sentar em silêncio.",
    picture:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQ-_Kkw3rMskFiJqYTPU_6K2MLgdszqxCjmX5o4GA=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "2",
    user: "Monkey D. Luffy",
    content: "Eu serei o rei dos piratas!",
    picture: "https://i.redd.it/wusvli4lv8271.png",
  },
  {
    id: "3",
    user: "Rammus",
    content: "Ok. Tá. É. hm.",
    picture:
      "https://pm1.aminoapps.com/6691/b763b04bde4a9e538809316b7e892055edbc41d1_128.jpg",
  },
  {
    id: "4",
    user: "ChatGPT",
    content:
      "Eu sou o ChatGPT, um modelo de linguagem desenvolvido pela OpenAI chamado GPT-3.5. Eu sou um programa de inteligência artificial projetado para compreender e gerar texto em resposta a inputs de linguagem natural. Estou aqui para ajudar a responder a perguntas, fornecer informações e auxiliar em diversas tarefas que envolvam o processamento de linguagem natural. Como uma IA, não tenho consciência, emoções ou intenções próprias.",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
  },
];

function App() {
  return (
    <section className="sectionWrapper">
      <form>
        <h1>Comentários</h1>
        <CreateComment />
        <div className="commentsList">
          {commentsArray.map((comment) => (
            <Comment
              key={comment.id}
              user={comment.user}
              content={comment.content}
              picture={comment.picture}
            />
          ))}
        </div>
      </form>
    </section>
  );
}

export default App;
