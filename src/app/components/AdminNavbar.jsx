import { logout } from "../../../lib/auth";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-[#181111] border-b border-orange-900 shadow">
      <span className="text-lg font-bold text-orange-400">Achcharu Admin</span>
      <nav className="flex gap-4">
        <button className="text-orange-200 hover:text-orange-400 font-semibold transition">Profile</button>
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
