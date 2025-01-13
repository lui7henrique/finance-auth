"use server";

import type { SignInValues } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { sleep } from "@/lib/utils";
import { redirect } from "next/navigation";

export type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	permissions: string[];
};

export async function signIn({ email, password }: SignInValues) {
	await sleep(1_000);

	const response = await fetch("http://localhost:3001/users");
	const users = (await response.json()) as User[];
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		await createSession(user);
		redirect("/dashboard");
	}

	return { success: false };
}

export async function signOut() {
	await deleteSession();
	redirect("/");
}
