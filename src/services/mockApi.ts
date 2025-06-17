// mockApi.ts - API 호출을 모의합니다

// 사용자 데이터 인터페이스
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  type?: string; // type 속성 추가 (확장 프로그램 에러 방지용)
}

// 로그인 응답 인터페이스
export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

// 회원가입 응답 인터페이스
export interface RegisterResponse {
  message: string;
  user: Omit<User, 'password'>;
}

// 사용자 데이터
const users: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'Test1234',
    name: '테스트 사용자',
    role: 'doctor',
    type: 'user', // 기본 type 속성 추가
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

// 안전한 객체 접근 유틸리티 함수
const safeAccess = <T>(obj: any, key: string, defaultValue: T): T => {
  try {
    return obj && typeof obj === 'object' && obj[key] !== undefined ? obj[key] : defaultValue;
  } catch (error) {
    console.warn(`Safe access failed for key "${key}":`, error);
    return defaultValue;
  }
};

// 데이터 검증 함수
const validateUserData = (user: any): User | null => {
  try {
    if (!user || typeof user !== 'object') {
      return null;
    }

    return {
      id: safeAccess(user, 'id', ''),
      email: safeAccess(user, 'email', ''),
      password: safeAccess(user, 'password', ''),
      name: safeAccess(user, 'name', ''),
      role: safeAccess(user, 'role', 'student'),
      type: safeAccess(user, 'type', 'user'),
      createdAt: safeAccess(user, 'createdAt', new Date().toISOString()),
    };
  } catch (error) {
    console.warn('User data validation failed:', error);
    return null;
  }
};

// Mock API 함수 구현
export const mockLogin = async (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const user = users.find((u) => {
          const validatedUser = validateUserData(u);
          return validatedUser && 
                 safeAccess(validatedUser, 'email', '') === email && 
                 safeAccess(validatedUser, 'password', '') === password;
        });
        
        if (user) {
          const validatedUser = validateUserData(user);
          if (validatedUser) {
            const { password: _, ...userWithoutPassword } = validatedUser;
            resolve({
              token: 'mock-jwt-token',
              user: {
                ...userWithoutPassword,
                type: 'user' // 안전한 기본값 설정
              },
            });
          } else {
            reject(new Error('사용자 데이터가 유효하지 않습니다.'));
          }
        } else {
          reject(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'));
        }
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      reject(new Error('로그인 중 오류가 발생했습니다.'));
    }
  });
};

export const mockRegister = async (email: string, password: string, name: string): Promise<RegisterResponse> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (users.some((u) => {
          const validatedUser = validateUserData(u);
          return validatedUser && safeAccess(validatedUser, 'email', '') === email;
        })) {
          reject(new Error('이미 등록된 이메일입니다.'));
          return;
        }
        
        const newUser: User = {
          id: String(users.length + 1),
          email: email || '',
          password: password || '',
          name: name || '',
          role: 'student',
          type: 'user', // 안전한 기본값 설정
          createdAt: new Date().toISOString(),
        };
        
        const validatedUser = validateUserData(newUser);
        if (!validatedUser) {
          reject(new Error('유효하지 않은 사용자 데이터입니다.'));
          return;
        }
        
        users.push(validatedUser);
        
        const { password: _, ...userWithoutPassword } = validatedUser;
        
        resolve({
          message: '회원가입이 완료되었습니다.',
          user: {
            ...userWithoutPassword,
            type: 'user' // 안전한 기본값 설정
          },
        });
      }, 1000);
    } catch (error) {
      console.error('Register error:', error);
      reject(new Error('회원가입 중 오류가 발생했습니다.'));
    }
  });
};

export const mockFetchProfile = async (token: string): Promise<Omit<User, 'password'>> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (token === 'mock-jwt-token') {
          const user = users[0];
          const validatedUser = validateUserData(user);
          
          if (validatedUser) {
            const { password: _, ...userWithoutPassword } = validatedUser;
            resolve({
              ...userWithoutPassword,
              type: 'user' // 안전한 기본값 설정
            });
          } else {
            reject(new Error('사용자 데이터가 유효하지 않습니다.'));
          }
        } else {
          reject(new Error('인증이 필요합니다.'));
        }
      }, 1000);
    } catch (error) {
      console.error('Profile fetch error:', error);
      reject(new Error('프로필 조회 중 오류가 발생했습니다.'));
    }
  });
};