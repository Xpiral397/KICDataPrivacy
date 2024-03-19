"use client";
import { SingleSidebarBoardLayout } from "@/components/sidebar";
import { ReactNode, useEffect,useState } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {isSigIn} from "../helpers/authenticate";
import {Spinner} from "@nextui-org/react";

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
   
    setLoading(true)
    
    if (session.status !== "authenticated") {
    
      router.push("/auth/login");
      setLoading(false)
    } 
    else if(session.status == "authenticated") {
      (async ()=>{
        const response = await isSigIn((session.data.user as any ).refreshToken)
        if(response){
            router.push("/dashboard/Account");
            setLoading(false)
         
            console.log('Kiolo',session.status)
        }
        else{
          signOut()
          setLoading(false)
         
        }
      })();
    }
   
  }, []);
  if(session.status === "authenticated" ){
    return <div className="h-full flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center w-full h-full items-center place-items-center">
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
   }
   else if(loading){
    
      <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
        <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
          <Spinner color="secondary" />
          <h1 className="text-purple-800 font-[600]">
          Loading...
          </h1>
        </div>
      </div>
   }
   return <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
   <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
     <Spinner color="secondary" />
     <h1 className="text-purple-800 font-[600]">
      Loading Template
     </h1>
   </div>
 </div>
    
  
  
}
