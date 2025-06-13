"use client";
import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialState;
      } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);

        return initialState;
      }
    }
    return initialState;
  });

  const deleteLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    setValue(initialState);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    }
  }, [key, value]);

  return [value, setValue, deleteLocalStorage];
};
