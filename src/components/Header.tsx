'use client'
import Navbar from "./Navbar";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { useSession } from "next-auth/react";


export default function Header() {

    // me conecto a la base de datos y traigo el usuario autenticado
    const { status, data } = useSession();
    const logged = data?.user?.name || ''


    return (
        <header className="flex justify-between items-center w-full h-20 px-4 text-white bg-gradient-to-b from-gray-500 to-gray-200 text-gray-500 sticky nav">
            <div>
                <Link href={"/"} className='flex gap-1 text-blue-500 font-bold' >
                    KANBAN HOME
                </Link>
            </div>
            <ul className="hidden md:flex">
                {data && (
                    <li className="flex gap-3 text-blue-500">
                        <b className="ms-1"> Hi!{logged} </b>
                        <LogoutButton />
                    </li>
                )}
            </ul>
            <Navbar logged={logged}/>
        </header>

    );
}