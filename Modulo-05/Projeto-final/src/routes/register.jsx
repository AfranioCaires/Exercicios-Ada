import { Gamepad2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, isEmailValid, isTextValid } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useLogin } from "@/contexts/authProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn } = useLogin();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/dashboard");
    }
  }, [isUserLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !date || !state || !country) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    if (!isTextValid(name)) {
      toast.error("Por favor, insira um nome válido.");
      return;
    }

    if (!isTextValid(state)) {
      toast.error("Por favor, insira um estado válido.");
      return;
    }

    if (!isTextValid(country)) {
      toast.error("Por favor, insira um país válido.");
      return;
    }

    const formData = {
      email,
      name,
      password,
      date,
      state,
      country,
      role: "user",
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/login");
        toast.success("Conta criada com sucesso!");
      })
      .catch((error) => {
        toast.error("Houve um erro ao criar a conta.");
      });
  };

  return (
    <>
      {/* min-h-screen */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="md:mx-auto w- md:w-full md:max-w-md">
          <Gamepad2 className="h-10 w-10 mx-auto" alt="Best Browser Games" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
            Criar uma conta
          </h2>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Insira seu nome"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
              <div className="w-full md:w-1/2">
                <Label htmlFor="email">Endereço de email</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <div>
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
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="date">Data de nascimento</Label>
              <div className="mt-2">
                <Popover className="w-full">
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between md:space-x-2">
              <div className="w-full md:w-1/2">
                <Label htmlFor="state">Estado</Label>
                <div className="mt-2">
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Digite seu estado"
                    autoComplete="adress"
                    required
                    className="w-full"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <div>
                  <Label htmlFor="country">País</Label>
                </div>
                <div className="mt-2">
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Digite seu país"
                    autoComplete="contry"
                    required
                    className="w-full"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="flex w-full justify-center">
                Criar conta
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
