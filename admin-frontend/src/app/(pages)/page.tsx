"use client"; 

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter(); 

  useEffect(() => {
    // Redirect to the login page
    router.push('/login');
  }, [router]);

  return (
    <div>Redirecting...</div> 
  );
}

export default Page;
