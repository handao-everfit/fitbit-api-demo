export const isLoggedSelector = (state) => state.rootUser.isLogged || false;

export const dataSelector = (state) => state.rootUser.data || [];
export const accessTokenSelector = (state) => state.access_token || "";
export const userIdSelector = (state) => state.userId || "";
