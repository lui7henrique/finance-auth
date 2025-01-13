"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type SignInValues, signInSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import type { signIn } from "@/actions/auth";
import { toast } from "sonner";

type SignInFormProps = {
	action: (data: SignInValues) => ReturnType<typeof signIn>;
};

export function SignInForm({ action }: SignInFormProps) {
	const form = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		const response = await action(data);

		if (!response.success) {
			toast.error("Invalid credentials");
		}
	});

	return (
		<form
			className="max-w-sm mx-auto flex flex-col items-center justify-center h-screen"
			onSubmit={handleSubmit}
		>
			<div className="space-y-4 w-full border p-4 rounded-md">
				<div className="space-y-2">
					<h1 className="text-2xl font-bold">Login</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>

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

				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full"
				>
					{form.formState.isSubmitting ? "Signing In..." : "Sign In"}
				</Button>
			</div>
		</form>
	);
}
