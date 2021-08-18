export const selectorIsLogged = (state) =>
  state.rootUser.user?.isLogged || false;

export const selectorData = (state) => state.rootUser.data || {};
