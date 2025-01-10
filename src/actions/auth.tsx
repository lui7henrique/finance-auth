"use server";

import type { SignInValues } from "@/lib/defitions";
import { redirect } from "next/navigation";

type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	permissions: string[];
};

export async function signIn({ email, password }: SignInValues) {
	const response = await fetch("http://localhost:3001/users");
	const users = (await response.json()) as User[];
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		redirect("/dashboard");
	}

	throw new Error("Invalid credentials");
}
