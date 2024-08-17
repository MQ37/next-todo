"use client";

import { useAppDispatch } from "../hooks";
import { removeAlert as removeAlertStore, addAlert as addAlertStore } from "../stores/alert";
import { AlertMessage } from "../types";

export function useAlert() {
  const dispatch = useAppDispatch();

  const addAlert = (message: string, type: 'success' | 'error' | 'info', timeout = 5000) => {
    const newAlert: AlertMessage = {
      id: Date.now(),
      message,
      type,
    };

    dispatch(addAlertStore(newAlert));

    setTimeout(() => {
      dispatch(removeAlertStore(newAlert.id));
    }, timeout);
  };

  function removeAlert(id: number) {
    dispatch(removeAlertStore(id));
  }

  return { addAlert, removeAlert };
}

