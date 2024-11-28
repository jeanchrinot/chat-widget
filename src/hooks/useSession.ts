import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Aixflow's Next.js session endpoint
const apiUrl = import.meta.env.VITE_NEXT_AUTH_API_URL;

interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
  expires: string;
}

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/auth/csrf`, {
      withCredentials: true,
    });
    console.log("CSRF Token:", response.data.csrfToken);
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

// Function to fetch session data from Aixflows's NextAuth
const fetchSession = async () => {
  console.log("API URL:", apiUrl);
  try {
    const response = await axios.get(`${apiUrl}/api/auth/session`, {
      withCredentials: true,
    });
    console.log("Session data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch session", error);
    return null;
  }
};

// Hook to fetch and manage session using React Query
export function useSession() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const session = data as Session;
  const isAuthenticated = !!session && Object.keys(session).length > 0;

  return { session, isAuthenticated, isLoading, error };
}

export const signInWithCsrf = async (email: string, password: string) => {
  try {
    const csrfToken = await fetchCsrfToken();

    const response = await axios.post(
      `${apiUrl}/api/auth/signin/credentials`,
      {
        csrfToken,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Sign-in response:", response.data);
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};
