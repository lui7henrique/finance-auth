"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type SignInValues, signInSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";

type SignInFormProps = {
	action: (data: SignInValues) => Promise<void>;
};

export function SignInForm({ action }: SignInFormProps) {
	const form = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		try {
			await action(data);
		} catch (error) {
			alert(error);
		}
	});

	return (
		<form
			className="space-y-4 max-w-md mx-auto flex flex-col items-center justify-center h-screen"
			onSubmit={handleSubmit}
		>
			<div className="space-y-2 w-full">
				<Input placeholder="Email" type="email" {...form.register("email")} />

				{form.formState.errors.email && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2 w-full">
				<Input
					placeholder="Password"
					type="password"
					{...form.register("password")}
				/>

				{form.formState.errors.password && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.password.message}
					</p>
				)}
			</div>

			<Button type="submit" disabled={form.formState.isSubmitting}>
				{form.formState.isSubmitting ? "Signing In..." : "Sign In"}
			</Button>
		</form>
	);
}
