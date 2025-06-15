"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const WHATSAPP_NUMBER = "94771234567"; // Replace with your business WhatsApp number

export default function CheckoutPage() {
  const { productslug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((products) => {
        const found = products.find((p) => p.slug === productslug);
        setProduct(found);
      });
  }, [productslug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0]">
        <span>Loading...</span>
      </div>
    );
  }

  const handleOrder = (e) => {
    e.preventDefault();
    const message = `Order for: ${product.name}%0AQuantity: ${quantity}%0AName: ${customer.name}%0APhone: ${customer.phone}%0AAddress: ${customer.address}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] px-4 py-12">
      <div className="max-w-xl w-full bg-[#231313] rounded-2xl shadow-2xl p-8 border border-[#d7263d] flex flex-col items-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 rounded-full p-2 shadow-lg">
          <Image src={product.image} alt={product.name} width={120} height={120} className="rounded-full border-4 border-orange-800" />
        </div>
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2 mt-16 text-center drop-shadow">Order: {product.name}</h1>
        <p className="text-orange-200 text-center mb-4 italic">{product.desc}</p>
        <form onSubmit={handleOrder} className="w-full flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
            <label className="flex-1 flex flex-col text-orange-200">
              Quantity
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="mt-1 p-2 rounded bg-[#181111] border border-orange-700 text-white focus:ring-2 focus:ring-orange-400" required />
            </label>
            <div className="flex flex-col text-orange-200">
              <span>Price</span>
              <span className="mt-1 p-2 rounded bg-[#181111] border border-orange-700 text-orange-300 font-bold">{product.price ? `Rs. ${product.price * quantity}` : "-"}</span>
            </div>
          </div>
          <label className="flex flex-col text-orange-200">
            Name
            <input type="text" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} className="mt-1 p-2 rounded bg-[#181111] border border-orange-700 text-white focus:ring-2 focus:ring-orange-400" required />
          </label>
          <label className="flex flex-col text-orange-200">
            Phone
            <input type="tel" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} className="mt-1 p-2 rounded bg-[#181111] border border-orange-700 text-white focus:ring-2 focus:ring-orange-400" required />
          </label>
          <label className="flex flex-col text-orange-200">
            Address
            <textarea value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} className="mt-1 p-2 rounded bg-[#181111] border border-orange-700 text-white focus:ring-2 focus:ring-orange-400" required />
          </label>
          <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition mt-4 text-lg tracking-wide">Order via WhatsApp</button>
        </form>
        {success && (
          <div className="mt-6 text-green-400 font-bold text-center animate-bounce">Order sent to WhatsApp!</div>
        )}
      </div>
    </div>
  );
}
