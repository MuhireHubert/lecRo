import clsx from "clsx";
import { useId, useState } from "react";


const FaqItem = ({ item, index }) => {
  const [active, setActive] = useState(false);
  const answerId = useId();

  return (
    <div className="relative z-2 mb-16">
      <button
        type="button"
        aria-expanded={active}
        aria-controls={answerId}
        className="group relative flex w-full items-center justify-between gap-4 px-7 text-left sm:gap-10"
        onClick={() => setActive(!active)}
      >
        <span className="block flex-1">
          <span aria-hidden="true" className="small-compact mb-1.5 block text-p3 max-lg:hidden">
            {index < 9 ? "0" : ""}
            {index + 1}
          </span>
          <span
            className={clsx(
              "h6 text-p4 transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center",
              active && "max-lg:text-p1",
            )}
          >
            {item.question}
          </span>
        </span>

        <span aria-hidden="true"
          className={clsx(
            "faq-icon relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-s2 shadow-400 transition-all duration-500 group-hover:border-s4",
            active && "before:bg-p1 after:rotate-0 after:bg-p1",
          )}
        >
          <span className="g4 size-11/12 rounded-full shadow-300" />
        </span>
      </button>

      <p id={answerId} hidden={!active} className="body-3 px-7 py-3.5 font-semibold">
        {item.answer}
      </p>

      <div
        className={clsx(
          "g5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500 absolute",
          active && "opacity-100",
        )}
      >
        <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-p1" />
      </div>
    </div>
  );
};

export default FaqItem;
