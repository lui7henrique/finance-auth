import { verifySession } from "@/lib/session";
import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await verifySession();

	if (!session) {
		redirect("/");
	}

	return (
		<SidebarProvider>
			<div className="flex">
				<AppSidebar userRole={session.role} signOut={signOut} />
				<div>{children}</div>
			</div>
		</SidebarProvider>
	);
}
