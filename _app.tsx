import '../styles/globals.css';
import '../styles/burger.css';
import '../styles/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'src/services/user';
import { store } from 'src/redux/store';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const protectedPaths = [/\cabinet/, /\admin/];

    const path = url.split('?')[0];

    if (!userService.userValue && protectedPaths.some((e) => path.match(e))) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }
  return (
    authorized && (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  );
}

export default MyApp;
