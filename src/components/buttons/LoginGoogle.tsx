'use client';
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signIn} from "next-auth/react";

export default function LoginGoogle() {

  return (
    <button
      onClick={() => signIn('google')}
      className="bg-white shadow text-center w-full py-4 px-4 flex gap-3 items-center justify-center rounded-md my-2">
      <FontAwesomeIcon icon={faGoogle} className="h-6" />
      <span>Continue with Google</span>
    </button>
  );
}
