import { Header } from "@/features/Header/Header";

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="h-full flex justify-center items-center">Page 2</div>
    </div>
  )
}