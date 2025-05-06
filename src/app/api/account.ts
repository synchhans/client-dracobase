import { User } from "@/types/user.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/account`;

export const apiGetAccounts = async (): Promise<User[] | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data accounts.");
    }
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch account data");
    }

    const responseData = await response.json();
    const accounts = responseData.data;

    return Array.isArray(accounts) ? accounts : accounts ? [accounts] : [];
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const apiEditAccount = async (
  id: string,
  level: string
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengedit data account.");
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ level }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update account. Status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(
      (err as Error).message ||
        "An unexpected error occurred while editing the account."
    );
    throw err;
  }
};

export const apiDeleteAccount = async (id: string): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal menghapus data account.");
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete account. Status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(
      (err as Error).message ||
        "An unexpected error occurred while deleting the account."
    );
    throw err;
  }
};
