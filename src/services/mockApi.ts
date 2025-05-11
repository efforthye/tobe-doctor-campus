// mockApi.ts - API 호출을 모의합니다
import axios from 'axios';

// 사용자 데이터 인터페이스
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
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
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

// Mock API 함수 구현
export const mockLogin = async (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve({
          token: 'mock-jwt-token',
          user: userWithoutPassword,
        });
      } else {
        reject(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'));
      }
    }, 1000);
  });
};

export const mockRegister = async (email: string, password: string, name: string): Promise<RegisterResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some((u) => u.email === email)) {
        reject(new Error('이미 등록된 이메일입니다.'));
        return;
      }
      
      const newUser: User = {
        id: String(users.length + 1),
        email,
        password,
        name,
        role: 'student',
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      resolve({
        message: '회원가입이 완료되었습니다.',
        user: userWithoutPassword,
      });
    }, 1000);
  });
};

export const mockFetchProfile = async (token: string): Promise<Omit<User, 'password'>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'mock-jwt-token') {
        const user = users[0];
        const { password, ...userWithoutPassword } = user;
        
        resolve(userWithoutPassword);
      } else {
        reject(new Error('인증이 필요합니다.'));
      }
    }, 1000);
  });
};