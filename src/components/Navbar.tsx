'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import LogoutButton from './buttons/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

type LoggedProps = {
    logged: string;
}

export default function Navbar({logged}:LoggedProps) {
    const [nav, setNav] = useState(false);
    return (
        <>
            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-blue-500 md:hidden">
                {nav ?  <FontAwesomeIcon icon={faXmark} className="h-6" /> : <FontAwesomeIcon icon={faBars} className="h-6" />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute p-8 top-0 left-0 w-full h-fit bg-gray-300 to-white text-blue-500">
                    <li className="nav-links px-4 cursor-pointer capitalize font-medium text-blue-500 hover:text-white duration-200 link-underline">
                        <Link href={"/"}>
                            KANBAN BOARD
                        </Link>
                    </li>
                    <li className="">
                        <b className=""> {logged} </b>
                        <LogoutButton />
                    </li>
                </ul>
            )}
        </>
    )
}
