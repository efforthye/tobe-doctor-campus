import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';

// 타입 정의
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnailUrl: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  discount?: number;
  rating: number;
  studentsCount: number;
  lessons: Lesson[];
  isEnrolled?: boolean;
  progress?: number;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  categories: string[];
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  categories: [],
  loading: false,
  error: null,
};

// 비동기 액션
export const fetchCourses = createAsyncThunk('course/fetchCourses', async (_, { rejectWithValue }) => {
  try {
    // 실제 구현시에는 실제 API 엔드포인트로 변경
    const response = await axios.get('/api/courses');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (courseId: string, { rejectWithValue }) => {
    try {
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.get(`/api/courses/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'course/fetchEnrolledCourses',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.get('/api/courses/enrolled', {
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

export const enrollInCourse = createAsyncThunk(
  'course/enrollInCourse',
  async (courseId: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      // 실제 구현시에는 실제 API 엔드포인트로 변경
      const response = await axios.post(
        `/api/courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markLessonAsCompleted = createAsyncThunk(
  'course/markLessonAsCompleted',
  async (
    { courseId, lessonId }: { courseId: string; lessonId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;
      // 실제 구현시에는 실제 API 엔드포인트로
      const response = await axios.post(
        `/api/courses/${courseId}/lessons/${lessonId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 슬라이스 생성
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    resetCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Courses
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
      state.loading = false;
      state.courses = action.payload;
      // 강의 카테고리 추출
      const categoriesSet = new Set<string>();
      action.payload.forEach((course) => {
        categoriesSet.add(course.category);
      });
      state.categories = Array.from(categoriesSet);
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '강의 로딩에 실패했습니다';
    });

    // Fetch Course By Id
    builder.addCase(fetchCourseById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
      state.loading = false;
      state.currentCourse = action.payload;
    });
    builder.addCase(fetchCourseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '강의 상세 정보 로딩에 실패했습니다';
    });

    // Fetch Enrolled Courses
    builder.addCase(fetchEnrolledCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEnrolledCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchEnrolledCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '수강 중인 강의 로딩에 실패했습니다';
    });

    // Enroll In Course
    builder.addCase(enrollInCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(enrollInCourse.fulfilled, (state, action: PayloadAction<Course>) => {
      state.loading = false;
      // 현재 강의가 있고, 그 강의가 등록된 강의와 같다면 업데이트
      if (state.currentCourse && state.currentCourse.id === action.payload.id) {
        state.currentCourse = action.payload;
      }
      // 강의 목록에서도 해당 강의 업데이트
      const index = state.courses.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    });
    builder.addCase(enrollInCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '수강 신청에 실패했습니다';
    });

    // Mark Lesson As Completed
    builder.addCase(markLessonAsCompleted.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(markLessonAsCompleted.fulfilled, (state, action: PayloadAction<Course>) => {
      state.loading = false;
      // 현재 강의가 있고, 그 강의가 업데이트된 강의와 같다면 업데이트
      if (state.currentCourse && state.currentCourse.id === action.payload.id) {
        state.currentCourse = action.payload;
      }
      // 강의 목록에서도 해당 강의 업데이트
      const index = state.courses.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    });
    builder.addCase(markLessonAsCompleted.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '강의 완료 표시에 실패했습니다';
    });
  },
});

export const { clearCurrentCourse, resetCourseError } = courseSlice.actions;
export default courseSlice.reducer;