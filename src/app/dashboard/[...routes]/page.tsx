export default async function Page({
	params,
}: { params: Promise<{ routes: string[] }> }) {
	const { routes } = await params;
	const route = routes[0];

	return <div>Route: {route}</div>;
}
