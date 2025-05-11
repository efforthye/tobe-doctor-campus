import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockLogin, mockRegister, mockFetchProfile } from '../../services/mockApi';

// 타입 정의
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt?: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// 비동기 액션
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Mock API 사용
      const response = await mockLogin(email, password);
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '로그인에 실패했습니다');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, name }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      // Mock API 사용
      const response = await mockRegister(email, password, name);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '회원가입에 실패했습니다');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return true;
});

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue, getState }: any) => {
    try {
      const { token } = getState().auth;
      // Mock API 사용
      const response = await mockFetchProfile(token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '프로필 로딩에 실패했습니다');
    }
  }
);

// 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '로그인에 실패했습니다';
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '회원가입에 실패했습니다';
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });

    // Fetch User Profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '프로필 로딩에 실패했습니다';
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;