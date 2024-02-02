import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import LoginNav from "./buttons/LoginNav";

// import { useState } from "react";

export default async function Header() {

    const session = await getServerSession(authOptions)
    // States to handle the responsive navbar
    // const [nav, setNav] = useState(false);


    return (
        <header className="flex justify-between items-center w-full h-20 px-4 text-white bg-gradient-to-b from-gray-500 to-gray-200 text-gray-500 sticky nav">
            <div>
                <Link href={"/"} className='flex gap-1 text-blue-500 font-bold' >
                    KANBAN HOME
                </Link>
            </div>
            <ul className="hidden md:flex">
                {session && (
                    <li className="flex gap-3 text-blue-500">
                        <b className="ms-1"> Hi! {session?.user?.name} </b>
                        <LogoutButton />
                    </li>
                )}
                {!session && (
                    <li className="text-blue-500">
                        <LoginNav />
                    </li>
                )}
            </ul>
            {/* <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-blue-500 md:hidden">
                {nav ? <p>x</p> : <p>=</p>}
            </div> */}

            {/* {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-800 to-white text-blue-500">
                    <li className="nav-links px-4 cursor-pointer capitalize font-medium text-blue-500 hover:scale-105 hover:text-white duration-200 link-underline">
                        <Link href={"/"}>
                            KANBAN BOARD
                        </Link>
                    </li>
                    <li className="">
                        <b className="ms-1"> user </b>
                        <button onClick={()=>signOut()} className="ms-2 px-2 py-2 ">Sign out</button>
                    </li>
                </ul>
            )} */}
        </header>

    );
}