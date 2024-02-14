import { useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useDebouncedFunction = <T extends any[], R>(
  callback: (...args: T) => R,
  delay: number
): ((...args: T) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebouncedFunction;
