'use client';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signIn} from "next-auth/react";

export default function LoginCredentials() {

  return (
    <button
      onClick={() => signIn('credentials')}
      className="bg-white shadow text-center w-full py-4 px-4 flex gap-3 items-center justify-center rounded-md my-2">
      <FontAwesomeIcon icon={faUser} className="h-6" />
      <span>Continue with Credentials</span>
    </button>
  );
}
