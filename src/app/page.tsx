import { signIn } from "@/actions/auth";
import { SignInForm } from "./_components/sign-in-form";

export default function Home() {
	return <SignInForm action={signIn} />;
}
