"use client";

import type { User } from "@/actions/auth";
import { authAtom } from "@/store/auth";
import { useSetAtom } from "jotai";

type AuthProviderProps = {
	children: React.ReactNode;
	initialState: {
		user: User | null;
	};
};

export function AuthProvider({ children, initialState }: AuthProviderProps) {
	const setAuth = useSetAtom(authAtom);

	if (initialState.user) {
		setAuth(initialState);
	}

	return children;
}
