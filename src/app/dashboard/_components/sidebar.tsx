"use client";

import { signOut } from "@/actions/auth";
import { authAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import type { User } from "@/actions/auth";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	BarChart3Icon,
	BookOpenIcon,
	BriefcaseIcon,
	CogIcon,
	DollarSignIcon,
	GraduationCapIcon,
	LineChartIcon,
	LogOutIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type NavigationItem = {
	label: string;
	icon: React.ComponentType;
	href: string;
	role: string[];
};

const navigationItems: NavigationItem[] = [
	// Admin routes
	{
		label: "Users Management",
		icon: UsersIcon,
		href: "/dashboard/users",
		role: ["admin"],
	},
	{
		label: "Platform Analytics",
		icon: BarChart3Icon,
		href: "/dashboard/analytics",
		role: ["admin"],
	},
	{
		label: "System Settings",
		icon: CogIcon,
		href: "/dashboard/settings",
		role: ["admin"],
	},
	// Advisor routes
	{
		label: "Client Portfolios",
		icon: BriefcaseIcon,
		href: "/dashboard/portfolios",
		role: ["advisor"],
	},
	{
		label: "Market Data",
		icon: LineChartIcon,
		href: "/dashboard/market",
		role: ["advisor", "investor", "guest"],
	},
	// Investor routes
	{
		label: "My Portfolio",
		icon: DollarSignIcon,
		href: "/dashboard/my-portfolio",
		role: ["investor"],
	},
	// Guest routes
	{
		label: "Investment Simulator",
		icon: LineChartIcon,
		href: "/dashboard/simulator",
		role: ["guest", "investor"],
	},
	{
		label: "Educational Resources",
		icon: GraduationCapIcon,
		href: "/dashboard/education",
		role: ["guest", "investor", "advisor"],
	},
	{
		label: "Market Trends",
		icon: BookOpenIcon,
		href: "/dashboard/trends",
		role: ["guest", "investor", "advisor"],
	},
];

export function AppSidebar() {
	const { user } = useAtomValue(authAtom);

	const filteredItems = navigationItems.filter((item) =>
		item.role.includes(user?.role ?? "guest"),
	);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{filteredItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton asChild>
										<Link href={item.href}>
											<item.icon />
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton onClick={signOut}>
									<UserIcon />
									<span>{user?.name}</span>
									<Badge variant="outline">{user?.role}</Badge>
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem onClick={signOut}>
									<LogOutIcon />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
