import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  members: [],
  spouseArray: [],
  selectedSpouse: {},
  showMemberModal: false,
  currentMember: {},
  inviteCode: null,
  loading: false,
  error: "",
};

// Generate pending, fulfilled and rejected action types
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (familyTreeId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/members/${familyTreeId}`,
        config
      );

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createMembers = createAsyncThunk(
  "members/createMembers",
  async ({ memberData, dispatch, fetchMembers }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/members",
        memberData,
        config
      );
      console.log(memberData);

      const familyTreeId = memberData.familyTreeId;

      dispatch(fetchMembers(familyTreeId));
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createSpouse = createAsyncThunk(
  "members/createSpouse",
  async ({ spouseData, dispatch, fetchMembers }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/members/spouse",
        spouseData,
        config
      );

      const familyTreeId = spouseData.familyTreeId;

      dispatch(fetchMembers(familyTreeId));
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSpouses = createAsyncThunk(
  "spouses/fetchSpouses",
  async (pidsArray, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/members/spouses`,
        { pidsArray },
        config
      );

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createParents = createAsyncThunk(
  "members/createParents",
  async ({ parentsData, dispatch, fetchMembers }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/members/parents",
        parentsData,
        config
      );

      const familyTreeId = parentsData.familyTreeId;

      dispatch(fetchMembers(familyTreeId));
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createChild = createAsyncThunk(
  "members/createChild",
  async ({ childData, dispatch, fetchMembers }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/members/child",
        childData,
        config
      );

      const familyTreeId = childData.familyTreeId;

      dispatch(fetchMembers(familyTreeId));
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSingleMember = createAsyncThunk(
  "members/fetchSingleMember",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(id);
      console.log(`http://localhost:5000/api/members/member/${id}`);
      const response = await axios.get(
        `http://localhost:5000/api/members/member/${id}`,
        config
      );

      console.log(response);
      return response.data[0];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error.errors.task.message);
    }
  }
);
export const deleteMembers = createAsyncThunk(
  "members/deleteMembers",
  async (
    { memberId, dispatch, fetchMembers, familyTreeId },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(memberId);
      await axios.delete(
        `http://localhost:5000/api/members/${memberId}`,
        config
      );
      dispatch(fetchMembers(familyTreeId));

      return memberId;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error.errors.task.message);
    }
  }
);

export const updateMembers = createAsyncThunk(
  "members/updateMembers",
  async (
    { memberData, id, dispatch, fetchMembers, familyTreeId },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      console.log(memberData);
      const response = await axios.put(
        `http://localhost:5000/api/members/${id}`,
        memberData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch(fetchMembers(familyTreeId));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMemberByInviteCode = createAsyncThunk(
  "members/fetchMemberByInviteCode",
  async (inviteCode, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/members/by-invite-code/${inviteCode}`,
        config
      );

      localStorage.setItem("inviteCode", response.data.member.id);

      // const data = {
      //   inviteCode,
      //   ...response.data,
      // };
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    resetError(state) {
      state.error = "";
    },
    setCurrentMember(state, action) {
      state.currentMember = action.payload;
    },
    setShowMemberModal(state) {
      state.showMemberModal = !state.showMemberModal;
    },
    setSelectedSpouse(state, action) {
      state.selectedSpouse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.members = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSingleMember.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchSingleMember.fulfilled, (state, action) => {
      state.loading = false;
      state.currentMember = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSingleMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createMembers.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.members = [...state.members, action.payload];
      state.error = "";
    });
    builder.addCase(createMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createSpouse.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createSpouse.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createSpouse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createChild.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createChild.fulfilled, (state, action) => {
      state.loading = false;
      // state.members = [...state.members, action.payload];
      state.error = "";
    });
    builder.addCase(createChild.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSpouses.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchSpouses.fulfilled, (state, action) => {
      state.loading = false;
      state.spouseArray = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSpouses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createParents.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createParents.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createParents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteMembers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteMembers.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateMembers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateMembers.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchMemberByInviteCode.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMemberByInviteCode.fulfilled, (state, action) => {
      state.loading = false;
      state.inviteCode = action.payload.inviteCode;
      state.error = "";
    });
    builder.addCase(fetchMemberByInviteCode.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions generated by createSlice
export const {
  resetError,
  setCurrentMember,
  setShowMemberModal,
  setSelectedSpouse,
} = membersSlice.actions;

export default membersSlice.reducer;
