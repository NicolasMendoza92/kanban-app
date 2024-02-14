'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function LoginCredentialsForm() {

    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        if (!email || !password) {
            setError('Empty fields');
            return;
        }


        try {
            console.log(email, password)

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="grid place-items-center ">
            <div className="">
                <form action={handleSubmit} className="flex flex-col gap-3">
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
                        Login with credentials
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link className="text-sm mt-3 text-center" href={"/register"}>
                        Don't have an account? <span className="underline text-blue-500">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
