import React from "react";
import { useEffect, useState } from "react";
import { appConstants } from "@/constants/app";

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  console.log(`${appConstants.appIP}` + `${url}`);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch(`${appConstants.appIP}` + `${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          //   setLoading(false);
        },
        (error) => {
          setIsError(error);
          //   setLoading(false);
        }
      )
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, isError };
}

export default useFetch;
