import {
  Configuration,
  DefaultApi
} from "@/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

const basePath = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin : "");

export const useApiClients = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const apiClients = useMemo(() => {
    const config = new Configuration({
      basePath,
      accessToken: async () => {
        if (isAuthenticated) {
          return await getAccessTokenSilently();
        }
        return "";
      },
    });

    return new DefaultApi(config);
  }, [isAuthenticated]);

  return apiClients;
};
