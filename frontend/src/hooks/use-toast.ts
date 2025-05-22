"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { CreateToastFnReturn } from "@/types";

// Unique ID for toast
const uniqueId = (prefix = "toast") => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

export function useToast(): CreateToastFnReturn {
  const [toasts, setToasts] = useState<any[]>([]);
  const toastsRef = useRef(toasts);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const toast = (props: any = {}) => {
    const id = props.id || uniqueId();
    const duration = props.duration || 5000;

    // Add toast to state
    setToasts((prevToasts) => [...prevToasts, { id, ...props }]);

    // Set up auto-dismiss
    if (duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, duration);
    }

    return {
      id,
      dismiss: () => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      },
      update: (updateProps: any) => {
        setToasts((prevToasts) =>
          prevToasts.map((toast) =>
            toast.id === id ? { ...toast, ...updateProps } : toast
          )
        );
      },
    };
  };

  toast.dismiss = (toastId?: string) => {
    if (toastId) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
    } else {
      setToasts([]);
    }
  };

  return {
    toasts,
    toast,
    dismiss: toast.dismiss,
  };
}