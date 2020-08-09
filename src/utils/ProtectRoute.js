import * as React from 'react';

import useAuthContext from '../context/AuthContext';

const Protector = (props) => {
  const { fallback } = props;
  const Page = props.component;
  const FallbackRoute = fallback;

  const ctx = useAuthContext();
  if (!ctx.isAuthenticated && !fallback) {
    ctx.logout();
  }
  return (
    <>
      {ctx.isAuthenticated && <Page {...props} />}
      {!ctx.isAuthenticated && !!FallbackRoute && <FallbackRoute {...props} />}
    </>
  );
};

export const protectRoute = (pageRoute, fallbackRoute) => {
  return (props) => {
    return (
      <Protector component={pageRoute} fallback={fallbackRoute} {...props} />
    );
  };
};
