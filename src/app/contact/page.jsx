// app/contact/page.tsx (Server Component — no 'use client')
import Contact from "./component/contact";

export const metadata = {
  title: 'Contact Us',
};

export default function Page() {
  return <Contact />;
}
