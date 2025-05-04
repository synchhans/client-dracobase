import { User } from "@/types/user.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    return data.user || null;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const updateUser = async (userData: User): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const verifyUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401 || response.status === 403) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to verify user status");
    }

    const data = await response.json();

    if (!data.user) {
      throw new Error("User data is missing in the response");
    }

    return data.user as User;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};
