import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation";

interface SharePageprops{
    searchParams?:{userId?:string}
}

export default async function ShareLink({searchParams}:SharePageprops
) {
    const session=await getServerSession(authOptions);

    if(!searchParams?.userId){
        redirect("/")
    }   
    
    if(!session){
        redirect("/")
    }
    redirect(`streamboard?sharedFrom=${searchParams.userId}`)

    return (
        <div className="flex justify-center items-center h-screen text-lg font-semibold">
      Redirecting...
    </div>
    )
}