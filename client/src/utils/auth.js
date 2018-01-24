const authCookie = 'activeUser';

export const getUserTypes = (cookies) => {
  const user = cookies.get(authCookie);
  let userType = {
    isEmployee: false,
    isEmployer: false
  };

  if (!user) {
    return userType;
  }

  userType.isEmployee = user.userType === 'Employee';
  userType.isEmployer = user.userType === 'Employer';

  return userType;
};

export const getUserType = (cookies) => {
  const user = cookies.get(authCookie);
  return user && user.userType;
};

export const isAuthenticated = (cookies) => {
  return !!cookies.get(authCookie);
};

export const getUserId = (cookies) => {
  const user = cookies.get(authCookie);
  return user.id;
};

export const removeCookie = (cookies) => {
  cookies.remove(authCookie);
};

export const getAccountRoute = (cookies) => {
  const user = cookies.get(authCookie);
  return user ? `/${user.userType.toLowerCase()}` : '';
};
