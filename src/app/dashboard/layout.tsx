import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<div className="flex">
				<AppSidebar />
				<div className="p-4">{children}</div>
			</div>
		</SidebarProvider>
	);
}
