import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notify = (responseType: string, response: string) => {
  responseType === "success" &&
    toast.success(
      { response },
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );

  responseType === "error" &&
    toast.error(response, {
      position: toast.POSITION.TOP_RIGHT,
    });
};

export default function Toast() {
  return <ToastContainer />;
}
