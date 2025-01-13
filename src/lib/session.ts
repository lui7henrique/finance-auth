import type { User } from "@/actions/auth";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const SESSION_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: User) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		return payload as User;
	} catch (error) {
		console.log("Failed to verify session");
	}
}

export async function createSession(payload: User) {
	const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME);
	const session = await encrypt(payload);
	const cookieStore = await cookies();

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export const verifySession = async () => {
	const cookieStore = await cookies();
	const cookieValue = cookieStore.get("session")?.value;
	const session = await decrypt(cookieValue);

	if (session) {
		return session;
	}

	return null;
};

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
