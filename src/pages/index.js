

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';
import { paths } from '../paths';

const RedirectPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Assuming you have an auth hook to check authentication

  // Redirect logic
  useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated, redirect to dashboard/portfolio page
      router.push(paths.dashboard.index); // Replace 'paths.dashboard.index' with your dashboard/portfolio path
    } else {
      // If user is unauthenticated, redirect to login page
      router.push(paths.auth.login.modern); // Replace 'paths.auth.login.modern' with your login page path
    }
  }, [isAuthenticated, router]);

  return null; // Return null to avoid rendering any content
};

export default RedirectPage;

