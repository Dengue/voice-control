import { UserProvider } from "@/features/User/UserProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}