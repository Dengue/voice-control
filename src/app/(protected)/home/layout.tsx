import { Header } from "@/features/Header/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      {children}
    </div>
  )
}