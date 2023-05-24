import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";

export interface IAdminProps {
  pageTabs: number;
  browserWidth: number;
  openTabs: boolean;
  openModal: boolean;
  allUsers: Users[];
  allBoards: Boards[];
  keyword: { user: string; board: string };
  setPageTabs: Dispatch<SetStateAction<number>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenTabs: Dispatch<SetStateAction<boolean>>;
  togleTabs: (prev: boolean) => void;
  handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  submitUserSearch: () => void;
  submitBoardSearch: () => void;
  handleUserState: () => void;
  handleBoardDelete: () => void;
  setGetDeleteId: Dispatch<SetStateAction<string>>;
  setGetBanId: Dispatch<SetStateAction<string>>;
  getDeleteId: string;
  getBanId: string;
  userProfile: any;
  handleClearInput: () => void;
  submitKeyPressBoardSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  submitKeyPressUserSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  allUsersCounts: number;
  allBoardsCounts: number;
}

export interface AllUsers {
  users: Users[];
  counts: number;
}

export interface Users {
  createdAt: string;
  email: string;
  id: string;
  nickname: string;
  point: number;
  state: boolean;
  userImg: string | null;
  userRanking: string;
}

export interface AllUsersCounts {
  counts: number;
}

export interface AllBoards {
  boards: Boards[];
  counts: number;
}

export interface Boards {
  createdAt: string;
  id: number;
  title: string;
  user: {
    id: string;
    nickname: string;
  };
}

export interface AllBoardsCounts {
  counts: number;
}

export interface userProfile {
  id: string;
  email: string;
  nickname: string;
}
