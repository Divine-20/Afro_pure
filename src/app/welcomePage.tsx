"use client";
import Image from "next/image";
import Logo from "../../public/afropurelogo.png";
export default function WelcomePage() {
  // const router = useRouter();
  // const redirectToLogin = () => {
  //   router.push("/login");
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     redirectToLogin();
  //   },2000)
  // }, []);
  return (
    <main className="flex w-sreen h-screen items-center justify-center bg-bg">
      <div className="w-fit h-fit animate-bounce ">
        <Image src={Logo} height={200} width={200} alt="logo" />
      </div>
    </main>
  );
}
