import { useState, useEffect } from "react";

export default function useDebounce(text, delay) {
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debouncedText;
}
