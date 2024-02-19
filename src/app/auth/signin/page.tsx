'use client'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
        if (res?.status === 200) {
            router.push('/')
            console.log(res.ok)
        } else if (res?.status === 401) {
            setError('invalid credentials')
        }
        console.log(res)

    }

    return <div className='relative w-full h-screen m-auto'>
        <Image
            src='/images/blue_screen.webp'
            alt='barber'
            fill
            className='object-cover'
            sizes='max'
        />
        <div>
            <div className='absolute bg-gradient-to-tr from-black to-transparent top-0 w-full h-full' />
            <div className='relative flex-col flex justify-center items-center min-h-screen'>
                <h1 className='mb-3 text-4xl font-bold text-white text-center'>Sing in with credentials </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-3">
                    <input
                        name="email"
                        value={userInfo.email}
                        className="rounded-md w-80"
                        type="text"
                        placeholder="Email"
                        onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                    />
                    <input
                        name="password"
                        value={userInfo.password}
                        className="rounded-md w-80"
                        type="password"
                        placeholder="Password"
                        onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                    />
                    <button type="submit" >
                        Sing in
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                </form>
                <div className="text-white text-center">
                    <p >Try logging in with the test username</p>
                    <p className=" text-bold">admin@gmail.com - admin123 </p>
                </div>
                <Link className=" text-blue-500 transition-colors duration-300 hover:text-blue-200" href={"/"}>
                    <FontAwesomeIcon className="mx-2" icon={faArrowCircleLeft}/>
                    Go back
                    </Link>              
            </div>
        </div>
    </div>
}

export default SignIn;

