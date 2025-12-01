import { BASE_URL } from "@/constants";
import { User } from "@/models/user.model";

export async function updateUser(
  updatedUser: Partial<User> & { id: string }
): Promise<User> {
  const options: RequestInit = {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updatedUser }),
  };
  const res = await fetch(`${BASE_URL}/profile`, options);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error editing user profile ${errorMessage}`);
  }
  const userUdated: User = await res.json();
  return userUdated;
}
