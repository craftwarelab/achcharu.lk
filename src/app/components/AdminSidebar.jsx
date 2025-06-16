import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#1a1313] p-6 flex flex-col gap-4 shadow-lg border-r border-orange-900 min-h-screen">
      <h2 className="text-xl font-bold text-orange-400 mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="text-orange-200 hover:text-orange-400 font-semibold transition">Dashboard</Link>
        <Link href="/dashboard/products" className="text-orange-200 hover:text-orange-400 font-semibold transition">Products</Link>
         <Link href="/dashboard/recipes" className="text-orange-200 hover:text-orange-400 font-semibold transition">Recipes</Link>
        <Link href="/dashboard/contacts" className="text-orange-200 hover:text-orange-400 font-semibold transition">Contacts</Link>
        <Link href="/dashboard/categories" className="text-orange-200 hover:text-orange-400 font-semibold transition">Categories</Link>
        <Link href="/dashboard/users" className="text-orange-200 hover:text-orange-400 font-semibold transition">Users</Link>
        <Link href="/dashboard/orders" className="text-orange-200 hover:text-orange-400 font-semibold transition">Orders</Link>
        {/* <Link href="/dashboard/settings" className="text-orange-200 hover:text-orange-400 font-semibold transition">Settings</Link> */}
      </nav>
    </aside>
  );
}
