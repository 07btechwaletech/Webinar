import { Fragment } from "react";

// Words rise out of a mask one after another. Pair with an sr-only copy of the text.
export function SplitWords({ text, delay = 0, step = 55 }: { text: string; delay?: number; step?: number }) {
  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span className="word" style={{ "--d": `${delay + i * step}ms` } as React.CSSProperties}>
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
