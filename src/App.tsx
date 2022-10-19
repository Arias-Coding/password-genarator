import React, { useState } from "react";
import ThemeButton from "./components/themeButton";
import HandlerContent from "./components/HandlerContent";

interface contraseña {
  contraseña: string;
  length: number;
  contiene: Array<"minuscula" | "mayuscula" | "numero" | "simbolo">;
}

export default function App() {
  const [contraseña, setContraseña] = useState<contraseña>({
    contraseña: "Contraseña",
    length: 10,
    contiene: [],
  });

  const [theme, setTheme] = useState("");

  const contiene = (
    contenido: "minuscula" | "mayuscula" | "numero" | "simbolo"
  ) => {
    const isContains = contraseña.contiene.some((e) => e === contenido);
    let newContenido: Array<"minuscula" | "mayuscula" | "numero" | "simbolo"> =
      contraseña.contiene;

    isContains === true
      ? newContenido.splice(
          newContenido.findIndex((e) => e == contenido),
          1
        )
      : (newContenido = [...newContenido, contenido]);

    setContraseña({ ...contraseña, contiene: newContenido });
  };

  const generarContraseña = () => {
    if (contraseña.contiene.length === 0) {
      return;
    }

    let newPassword = "";

    for (let i = 0; i < contraseña.length; i++) {
      let digit: "minuscula" | "mayuscula" | "numero" | "simbolo" =
        contraseña.contiene[
          Math.trunc(Math.random() * contraseña.contiene.length)
        ];
      newPassword += generarDigito(digit);
    }

    setContraseña({ ...contraseña, contraseña: newPassword });
  };

  const generarDigito = (
    p: "minuscula" | "mayuscula" | "numero" | "simbolo"
  ) => {
    const letra = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz";
      return characters[Math.trunc(Math.random() * characters.length)];
    };
    const simbol = () => {
      const characters = "-_.";
      return characters[Math.trunc(Math.random() * characters.length)];
    };
    const digito = {
      minuscula: letra(),
      mayuscula: letra().toUpperCase(),
      numero: Math.trunc(Math.random() * 10),
      simbolo: simbol(),
    };
    const returned = digito[p];
    return returned;
  };

  return (
    <div className={`${theme} h-screen`}>
      <div className="h-full relative bg-zinc-200 dark:bg-slate-800 dark:text-black flex flex-col justify-center items-center text-zinc-100 relative">
        <ThemeButton
          setTheme={() => (theme === "" ? setTheme("dark") : setTheme(""))}
        />
        <div className="w-72 dark:text-neutral-700 rounded-xl overflow-hidden flex flex-col shadow-2xl dark:shadow-zinc-500/50">
          <div className="w-full h-full py-2 px-4 bg-zinc-300 dark:bg-neutral-800 dark:text-neutral-200 text-xl font-semibold text-black flex justify-between">
            <p>{contraseña.contraseña}</p>
            <button
              onClick={(e) =>
                navigator.clipboard.writeText(contraseña.contraseña)
              }
            >
              Copy
            </button>
          </div>
          <div className="bg-neutral-800 dark:bg-neutral-300 p-4 flex flex-col gap-4">
            <HandlerContent
              title={"Mayusculas"}
              onClick={() => contiene("mayuscula")}
            />
            <HandlerContent
              title={"Minusculas"}
              onClick={() => contiene("minuscula")}
            />
            <HandlerContent
              title={"Numeros"}
              onClick={() => contiene("numero")}
            />
            <HandlerContent
              title={"Simbolos"}
              onClick={() => contiene("simbolo")}
            />
            <input
              min="1"
              max="14"
              type="range"
              defaultValue={8}
              className="w-full bg-yellow-400"
              onChange={(e) =>
                setContraseña({
                  ...contraseña,
                  length: Number(e.currentTarget.value),
                })
              }
            ></input>
            <button
              className="w-full text-xl dark:text-white font-semibold p-2 text-center bg-yellow-500 rounded-xl hover:bg-yellow-400"
              onClick={(e) => {
                console.log("Generando contraseña");
                generarContraseña();
              }}
            >
              Generar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
