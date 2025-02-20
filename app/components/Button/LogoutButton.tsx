'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className='text-white bg-red-700 hover:bg-red-700/90 focus:ring-4 focus:outline-none focus:ring-red-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-red-700/55 me-2 mb-2'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
        />
      </svg>
      Logout
    </button>
  );
}
