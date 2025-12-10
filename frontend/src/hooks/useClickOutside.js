
import { useEffect } from "react";

export function useClickOutside(ref, callback, ignoreRef) {
  useEffect(() => {
    function handleClick(event) {
      // If click is inside the main element, do nothing
      if (ref.current && ref.current.contains(event.target)) return;

      // If click is inside the ignore element (like a button), do nothing
      if (ignoreRef && ignoreRef.current && ignoreRef.current.contains(event.target)) return;

      // Otherwise, call the callback
      callback();
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, ignoreRef]);
}

