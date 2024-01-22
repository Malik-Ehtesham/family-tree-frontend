import { configureStore } from "@reduxjs/toolkit";

import treesReducer from "./features/trees/treesSlice";
import usersReducer from "./features/users/usersSlice";
import membersReducer from "./features/members/membersSlice";
import authenticationReducer from "./features/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    members: membersReducer,
    users: usersReducer,
    trees: treesReducer,
  },
});

export default store;
