// import { useCallback, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import PropTypes from 'prop-types';
// import { useAuth } from '../hooks/use-auth';
// import { paths } from '../paths';
// import { Issuer } from '../utils/auth';

// const loginPaths = {
//   [Issuer.JWT]: paths.auth.login.modern
// };

// export const AuthGuard = (props) => {
//   const { children } = props;
//   const router = useRouter();
//   const { isAuthenticated, issuer } = useAuth();
//   const [checked, setChecked] = useState(false);

//   const check = useCallback(() => {
//     if (!isAuthenticated) {
//       const searchParams = new URLSearchParams({ returnTo: globalThis.location.href }).toString();
//       const href = loginPaths[issuer] + `?${searchParams}`;
//       router.replace(href);
//     } else {
//       setChecked(true);
//     }
//   }, [isAuthenticated, issuer, router]);

//   // Only check on mount, this allows us to redirect the user manually when auth state changes
//   useEffect(() => {
//       check();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   if (!checked) {
//     return null;
//   }

//   // If got here, it means that the redirect did not occur, and that tells us that the user is
//   // authenticated / authorized.

//   return <>{children}</>;
// };

// AuthGuard.propTypes = {
//   children: PropTypes.node
// };



import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import { paths } from '../paths';
import { Issuer } from '../utils/auth';

const loginPaths = {
  [Issuer.JWT]: paths.auth.login.modern
};

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, issuer } = useAuth();
  const [loading, setLoading] = useState(true);

  const checkAuthentication = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({ returnTo: globalThis.location.href }).toString();
      const href = loginPaths[issuer] + `?${searchParams}`;
      router.replace(href);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, issuer, router]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (loading) {
    return null; // You can replace this with a loading indicator or placeholder content
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
