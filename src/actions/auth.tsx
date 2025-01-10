type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	permissions: string[];
};

export async function signIn(email: string, password: string) {
	const response = await fetch("http://localhost:3001/users");
	const users = (await response.json()) as User[];
	const user = users.find((u) => u.email === email && u.password === password);

	if (!user) {
		return null;
	}

	return user;
}
