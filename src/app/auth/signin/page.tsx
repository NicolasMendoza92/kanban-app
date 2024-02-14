'use client'
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

interface Props {

}

const SignIn: NextPage = (props): JSX.Element => {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    // handle errors 
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        
        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });
        if (res?.status === 200){
            router.push('/')
            console.log(res.ok)
        } else if(res?.status === 401){
            setError('invalid credentials')
        }
        console.log(res)

    }

    return <div className="grid place-items-center ">
         <h1 className='mb-3 text-2xl font-bold'>Sing in with credentials </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                name="email"
                value={userInfo.email}
                className="rounded-md"
                type="text"
                placeholder="Email"
                onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
            />
            <input
                name="password"
                value={userInfo.password}
                className="rounded-md"
                type="password"
                placeholder="Password"
                onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
            />
            <button type="submit" className="bg-white shadow text-center w-full py-4 px-4 flex gap-3 items-center justify-center rounded-md">
                Sing in
            </button>
            {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
        </form>
        <p className="text-xs">Try logging in with the test username</p>
        <p className="text-xs text-bold">admin@gmail.com </p>
        <p  className="text-xs text-bold">admin123 </p>
    </div>
}

export default SignIn;