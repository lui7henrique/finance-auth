import { atom } from "jotai";
import type { User } from "@/actions/auth";

type AuthState = {
	user: User | null;
};

export const authAtom = atom<AuthState>({
	user: null,
});
