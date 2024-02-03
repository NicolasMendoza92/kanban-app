import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Navbar from "./Navbar";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import LoginNav from "./buttons/LoginNav";



export default async function Header() {

    // me conecto a la base de datos y traigo el usuario autenticado
    const session = await getServerSession(authOptions);
    const logged = session?.user?.name || ''


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
            <Navbar logged={logged}/>
        </header>

    );
}