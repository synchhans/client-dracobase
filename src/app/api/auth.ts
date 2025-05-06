import { User } from "@/types/user.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const fetchUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        return null;
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "Failed to fetch user data");
        return null;
      }
    }

    const data = await response.json();

    return data.user || null;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    return null;
  }
};

export const updateUser = async (
  userData: User,
  type: string
): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await fetch(`${API_URL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...userData, type }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user data");
    }
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const verifyUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.message || "Failed to verify user status");
      return null;
    }

    const data = await response.json();

    if (!data.user) {
      console.error("User data is missing in the response");
      return null;
    }

    return data.user as User;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to logout");
    }

    localStorage.removeItem("token");
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};
