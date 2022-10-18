import React, { useState } from "react";

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
    <>
      <div className="w-screen h-screen bg-zinc-200 flex flex-col justify-center items-center text-zinc-100 relative">
        <div className="w-72 bg-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
          <div className="py-2 px-4 bg-zinc-300 text-xl font-semibold text-black flex justify-between">
            <p>{contraseña.contraseña}</p>
            <button
              onClick={(e) =>
                navigator.clipboard.writeText(contraseña.contraseña)
              }
            >
              Copy
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between text-lg font-semibold">
              <p>Mayusculas</p>
              <button
                className="text-2xl"
                onClick={(e) => {
                  contiene("mayuscula");
                  e.currentTarget.classList.toggle("text-yellow-500");
                }}
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Minusculas</p>
              <button
                className="text-2xl"
                onClick={(e) => {
                  contiene("minuscula");
                  e.currentTarget.classList.toggle("text-yellow-500");
                }}
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Numeros</p>
              <button
                className="text-2xl"
                onClick={(e) => {
                  contiene("numero");
                  e.currentTarget.classList.toggle("text-yellow-500");
                }}
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Simbolos</p>
              <button
                className="text-2xl"
                onClick={(e) => {
                  contiene("simbolo");
                  e.currentTarget.classList.toggle("text-yellow-500");
                }}
              >
                +
              </button>
            </div>
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
          </div>
          <div className="p-2 text-xl font-semibold">
            <button
              className="w-full p-2 text-center bg-yellow-500 rounded-xl hover:bg-yellow-400"
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
    </>
  );
}
