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
	UserIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";

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

type AppSidebarProps = {
	userRole: User["role"];
	signOut: () => Promise<void>;
};

export function AppSidebar({ userRole, signOut }: AppSidebarProps) {
	const filteredItems = navigationItems.filter((item) =>
		item.role.includes(userRole),
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
						<SidebarMenuButton onClick={signOut}>
							<UserIcon />
							<span>Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
