import LoginGoogle from "../buttons/LoginGoogle";
import LoginCredentials from "../buttons/LoginCredentials";
import Image from "next/image";

export default function LoginView() {
    return (
        <div className='grid  lg:grid-cols-3 w-full h-screen text-center '>
            <div className="justify-center items-center mx-3">
                <h1 className='text-white text-3xl lg:text-6xl font-semibold text-start lg:text-left'>
                    Create and manage  <br /> your and your team's tasks
                </h1>
                <p className=' text-gray-500 text-3xl lg:text-6xl text-gray-500 text-start lg:text-left'>
                    on your own Boards
                </p>
                <div className="my-3 gap-3">
                    <LoginGoogle />
                    <LoginCredentials />
                </div>

            </div>
            <div className="col-span-2 ">
            <div className='relative w-full h-screen rounded-lg'>
                <Image
                    src='/images/blue_screen.webp'
                    alt='barber'
                    fill
                    className='object-cover'
                    sizes='max'
                />
               </div> 
            </div>

        </div>

    )
}
