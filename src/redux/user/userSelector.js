export const selectorIsLogged = (state) =>
  state.rootUser.user?.isLogged || false;
