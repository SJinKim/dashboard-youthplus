'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import LogoutButton from '../Button/LogoutButton';

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <header className='Navbar px-5 py-3 shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          {theme == 'light' ? (
            <Image src='/yp_logo_clr.png' alt='logo' width={100} height={30} />
          ) : (
            <Image src='/yp_logo.png' alt='logo' width={100} height={30} />
          )}
        </Link>
        <div className='flex items-center mr-3'>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
