import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 정의
export type Theme = 'light' | 'dark';
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export interface UiState {
  theme: Theme;
  isSidebarOpen: boolean;
  isLoading: boolean;
  toasts: Toast[];
  modals: Modal[];
  currentActiveTab: string;
}

// 초기 상태
const initialState: UiState = {
  theme: 'light',
  isSidebarOpen: false,
  isLoading: false,
  toasts: [],
  modals: [],
  currentActiveTab: 'home',
};

// 슬라이스 생성
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Date.now().toString();
      state.toasts.push({
        ...action.payload,
        id,
        duration: action.payload.duration || 3000,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    addModal: (state, action: PayloadAction<Omit<Modal, 'id'>>) => {
      const id = Date.now().toString();
      state.modals.push({
        ...action.payload,
        id,
        showCancel: action.payload.showCancel !== undefined ? action.payload.showCancel : true,
      });
    },
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter((modal) => modal.id !== action.payload);
    },
    clearModals: (state) => {
      state.modals = [];
    },
    setCurrentActiveTab: (state, action: PayloadAction<string>) => {
      state.currentActiveTab = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setIsLoading,
  addToast,
  removeToast,
  clearToasts,
  addModal,
  removeModal,
  clearModals,
  setCurrentActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer;