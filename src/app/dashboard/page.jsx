'use client';
import { useEffect, useState } from "react";
import { getAllUsers, getAllProducts, getAllRecipes, getAllContacts, getAllOrders } from "../../../lib/database";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    recipes: 0,
    contacts: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, products, recipes, contacts, orders] = await Promise.all([
          getAllUsers(),
          getAllProducts(),
          getAllRecipes(),
          getAllContacts(),
          getAllOrders(),
        ]);
        setStats({
          users: users.length,
          products: products.length,
          recipes: recipes.length,
          contacts: contacts.length,
          orders: orders.length,
        });
      } catch (e) {
        setStats({ users: 0, products: 0, recipes: 0, contacts: 0, orders: 0 });
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-orange-400 mb-6">Admin Dashboard</h1>
      <p className="text-orange-200">Welcome to the admin dashboard. Use the sidebar to manage products, users, and orders.</p>
      <h2 className="text-2xl font-bold text-orange-300 mt-8 mb-4">Dashboard Overview</h2>
      {loading ? (
        <div className="text-center text-orange-200">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-[#2d1616] rounded-lg p-6 shadow text-center">
            <div className="text-5xl font-bold text-orange-300 mb-2">{stats.users}</div>
            <div className="text-lg text-orange-100">Total Users</div>
          </div>
          <div className="bg-[#2d1616] rounded-lg p-6 shadow text-center">
            <div className="text-5xl font-bold text-orange-300 mb-2">{stats.products}</div>
            <div className="text-lg text-orange-100">Total Products</div>
          </div>
          <div className="bg-[#2d1616] rounded-lg p-6 shadow text-center">
            <div className="text-5xl font-bold text-orange-300 mb-2">{stats.recipes}</div>
            <div className="text-lg text-orange-100">Total Recipes</div>
          </div>
          <div className="bg-[#2d1616] rounded-lg p-6 shadow text-center">
            <div className="text-5xl font-bold text-orange-300 mb-2">{stats.contacts}</div>
            <div className="text-lg text-orange-100">Contact Messages</div>
          </div>
          <div className="bg-[#2d1616] rounded-lg p-6 shadow text-center md:col-span-2">
            <div className="text-5xl font-bold text-orange-300 mb-2">{stats.orders}</div>
            <div className="text-lg text-orange-100">Total Orders</div>
          </div>
        </div>
      )}
    </div>
  );
}
