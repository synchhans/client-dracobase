import { User } from "@/types/user.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/account`;

export const apiGetAccounts = async (): Promise<User[] | null> => {
  try {
    const response = await fetch(API_URL, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

export const apiDeleteAccount = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
