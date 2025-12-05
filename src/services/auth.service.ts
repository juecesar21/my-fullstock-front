import { BASE_URL } from "@/constants";
import { User } from "@/models/user.model";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${BASE_URL}/me`, options);
    if (!res.ok) {
      return null;
    }
    const userResponse: User = await res.json();
    return userResponse;
  } catch (error) {
    console.log(`Error getting User ${error}`);
    return null;
  }
}

export async function login(email: string, password: string): Promise<User> {
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  const res = await fetch(`${BASE_URL}/login`, options);
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Authentication failed ${errorData}`);
  }
  const userResponse: User = await res.json();
  return userResponse;
}

export async function signup(email: string, password: string): Promise<User> {
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      email, 
      password,
      confirmPassword: password, 
    }),
  };
  const res = await fetch(`${BASE_URL}/register`, options);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Registration failed ${errorMessage}`);
  }
  const userResponse: User = await res.json();
  return userResponse;
}

export async function logout(): Promise<void> {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST", 
    credentials: "include"
  })
}
