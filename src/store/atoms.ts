import { atom } from 'jotai';

// 예시: 지갑 연결 상태를 관리하는 atom
export const walletConnectedAtom = atom<boolean>(false);

// 예시: 현재 선택된 계정 주소를 관리하는 atom
export const selectedAccountAtom = atom<string>('');

// 예시: 다크모드 상태를 관리하는 atom
export const darkModeAtom = atom<boolean>(false);

// 최근 조회한 사용자 ID 기록
export const recentlyViewedUsersAtom = atom<string[]>([]); 