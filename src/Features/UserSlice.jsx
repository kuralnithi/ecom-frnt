import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: { isValid: false,
                  userTypeState:"none"
  },
  reducers: { userValid: (state, action) => {state.isValid = action.payload },
              userType: (state, action) => {state.userTypeState = action.payload }
  },

}
);

export const { userValid, userType} = UserSlice.actions;

export default UserSlice.reducer;
