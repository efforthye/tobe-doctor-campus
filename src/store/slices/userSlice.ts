import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';

// 타입 정의
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  enrolledCourses?: string[];
  completedCourses?: string[];
  preferences?: {
    notifications: boolean;
    emailAlerts: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// 비동기 액션
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: Partial<UserProfile>, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.put('/api/user/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (file: File, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const formData = new FormData();
      formData.append('avatar', file);
      
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.post('/api/user/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 슬라이스 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
    resetUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '프로필 로딩에 실패했습니다';
    });

    // Update User Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '프로필 업데이트에 실패했습니다';
    });

    // Upload Avatar
    builder.addCase(uploadAvatar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '아바타 업로드에 실패했습니다';
    });
  },
});

export const { resetUserState, resetUserError } = userSlice.actions;
export default userSlice.reducer;