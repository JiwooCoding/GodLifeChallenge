import { useEffect, useState, RefObject } from "react";

// Define the interfaces for props and return values
interface UseDetectCloseProps {
  elem: RefObject<HTMLElement>;
  initialState: boolean;
}

interface UseDetectCloseReturn {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useDetectClose = ({ elem, initialState }: UseDetectCloseProps): UseDetectCloseReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current && !elem.current.contains(e.target as Node)) {
        setIsOpen(prev => !prev);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);

  return { isOpen, setIsOpen };
};

export default useDetectClose;
