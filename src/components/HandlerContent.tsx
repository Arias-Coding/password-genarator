interface HeadingProps {
  onClick: Function;
  title: string;
}

export default function handlerContent({ title, onClick }: HeadingProps) {
  return (
    <div className="flex justify-between text-lg font-semibold">
      <p>{title}</p>
      <button
        className="text-2xl"
        onClick={(e) => {
          onClick();
          e.currentTarget.classList.toggle("text-yellow-500");
          e.currentTarget.classList.toggle("dark:text-yellow-600");
        }}
      >
        +
      </button>
    </div>
  );
}
