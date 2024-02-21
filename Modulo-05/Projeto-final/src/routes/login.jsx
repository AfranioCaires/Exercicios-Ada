import { useState, useEffect } from "react";
import { Gamepad2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isEmailValid } from "@/lib/utils";
import { useLogin } from "@/contexts/authProvider";

export default function Login() {
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    fetch(
      "https://my-json-server.typicode.com/AfranioCaires/BestBrowserGames/users"
    )
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          toast.success("Login realizado com sucesso!");
          navigate("/dashboard");
          login(email, user.role);
        } else {
          toast.error("Credenciais inválidas. Por favor, tente novamente.");
        }
      })
      .catch((error) => {
        toast.error("Houve um erro ao realizar o login");
      });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/dashboard");
    }
  }, [isUserLoggedIn]);
  return (
    <div className="flex min-h-[80svh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="md:mx-auto md:w-full md:max-w-md">
        <Gamepad2 className="h-10 w-10 mx-auto" alt="Best Browser Games" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Endereço de email</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="flex w-full justify-center">
              Entrar
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Não possui uma conta?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Criar uma conta
          </Link>
        </p>
      </div>
    </div>
  );
}
