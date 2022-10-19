interface HeadingProps {
  setTheme: Function;
}

export default function Heading({ setTheme }: HeadingProps) {
  return (
    <div className="absolute top-6 right-6">
      <button
        className="w-16 h-8 relative bg-slate-600 dark:bg-zinc-200 p-1 rounded-2xl"
        onClick={(e) => {
          e.currentTarget.firstElementChild?.classList.toggle(
            "translate-x-full"
          );
          setTheme();
        }}
      >
        <div className="bg-zinc-200 dark:bg-slate-800 transition duration-700 w-1/2 h-full rounded-2xl"></div>
      </button>
    </div>
  );
}
