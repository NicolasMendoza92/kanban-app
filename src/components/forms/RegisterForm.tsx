'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function RegisterForm() {
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {

        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        if (!name || !email || !password) {
            setError('Empty fields');
            return;
        }

        try {

            console.log(name, email, password)

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="">
            <form action={handleSubmit} className="flex flex-col gap-3">
                <input
                    name="name"
                    className="rounded-md"
                    type="text"
                    placeholder="Full name"
                />
                <input
                    name="email"
                    className="rounded-md"
                    type="text"
                    placeholder="Email"
                />
                <input
                    name="password"
                    className="rounded-md"
                    type="password"
                    placeholder="Password"
                />
                <button className="bg-white shadow text-center w-full py-4 px-4 flex gap-3 items-center justify-center rounded-md">
                    Register
                </button>

                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}
