'use client';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton({
  className = 'flex items-center gap-2 text-gray-700',
  iconLeft = false,
  iconClasses = '',
}) {

  async function logout() {
    await signOut({
      callbackUrl: "http://localhost:3000",
    })
  }

  return (
    <button
      className={className}
      onClick={logout}>
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
      <span>Logout</span>
      {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
    </button>
  );
}