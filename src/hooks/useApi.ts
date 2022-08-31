import { AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoader, closeLoader } from "../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../redux/actions/toast/toastActions";

const useApi = (apiFunc: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const request = async (...args: any[]) => {
    dispatch(openLoader());
    setLoading(true);
    try {
      const result = await apiFunc([...args]);
      setData(result.data);
    } catch (err: any) {
      console.log("errr", err?.response?.data?.message);
      if (err?.response?.data?.message === "Please login again") {
        sessionStorage.clear();
        window.location.href = "/";
      } else {
        setError(err?.response?.data?.message || "Unexpected Error!");
        dispatch(
          openToastAndSetContent({
            toastStyles: {
              fontFamily: "'Kumbh Sans'",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "24px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              letterSpacing: "-0.011em",
              color: "#E00000",
              backgroundColor: "#FFECEC",
              boxSizing: "border-box",
              borderRadius: "8px",
              justifyContent: "center",
            },
            toastContent: err?.response?.data?.message,
          })
        );
      }
    } finally {
      dispatch(closeLoader());
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
