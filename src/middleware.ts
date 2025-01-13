import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { unauthorized } from "next/dist/client/components/navigation";

type RoutePermissions = {
	[key: string]: string[];
};

const routePermissions: RoutePermissions = {
	"/dashboard/users": ["admin"],
	"/dashboard/analytics": ["admin"],
	"/dashboard/settings": ["admin"],
	"/dashboard/portfolios": ["advisor"],
	"/dashboard/market": ["advisor", "investor", "guest"],
	"/dashboard/my-portfolio": ["investor"],
	"/dashboard/simulator": ["guest", "investor"],
	"/dashboard/education": ["guest", "investor", "advisor"],
	"/dashboard/trends": ["guest", "investor", "advisor"],
};

export async function middleware(request: NextRequest) {
	const session = request.cookies.get("session");

	if (!session?.value) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const user = await decrypt(session.value);

	if (!user) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const path = request.nextUrl.pathname;
	const requiredRoles = routePermissions[path];

	if (requiredRoles) {
		const hasPermission = requiredRoles.includes(user.role);

		if (!hasPermission) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
