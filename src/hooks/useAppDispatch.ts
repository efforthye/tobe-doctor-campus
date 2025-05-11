import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

// AppDispatch 타입의 dispatch를 사용하기 위한 커스텀 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();
