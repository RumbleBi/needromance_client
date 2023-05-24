import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";

import {
  deleteUserBoard,
  patchUserState,
  getAllBoards,
  getAllUsers,
  getSearchBoard,
  getSearchUser,
} from "../../../commons/api/admin";
import {
  accessTokenState,
  userProfileState,
} from "../../../commons/store/atoms";
import { Boards, Users } from "./Admin.types";
import AdminUI from "./Admin.presenter";
import useAuth from "../../commons/hooks/customs/useAuth";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  // accessToken
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const [pageTabs, setPageTabs] = useState(0);
  const [openTabs, setOpenTabs] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(0);
  // 유저 목록
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [allUsersCounts, setAllUsersCounts] = useState(0);
  // 게시글 목록
  const [allBoards, setAllBoards] = useState<Boards[]>([]);
  const [allBoardsCounts, setAllBoardsCounts] = useState(0);
  // 검색 value
  const [keyword, setKeyword] = useState({ user: "", board: "" });
  // modal id 값을 기준으로 on off
  const [getDeleteId, setGetDeleteId] = useState("");
  const [getBanId, setGetBanId] = useState("");

  // 어드민 계정 확인
  // useEffect(() => {
  //   if (userProfile.role !== "admin") {
  //     router.push("/");
  //   }
  // }, []);

  const getAllUsersData = useCallback(async () => {
    try {
      const response = await getAllUsers(accessToken);
      const resUsersCounts = response.counts;
      const resAllUsers = response.users;

      setAllUsers([...resAllUsers]);
      setAllUsersCounts(resUsersCounts);
    } catch (error) {
      throw error;
    }
  }, [accessToken, setAllUsers]);

  // 유저목록 검색어 초기화시 리스트 리렌더링
  useEffect(() => {
    if (keyword.user === "") {
      getAllUsersData();
    }
  }, [keyword.user, getAllUsersData]);

  const getAllBoardsData = useCallback(async () => {
    try {
      const response = await getAllBoards(accessToken);
      const resBoardsCounts = response.counts;
      const resAllBoards = response.boards;

      setAllBoardsCounts(resBoardsCounts);
      setAllBoards([...resAllBoards]);
    } catch (error) {
      throw error;
    }
  }, [accessToken, setAllBoards]);

  // 게시글 검색어 초기화시 리스트 리렌더링
  useEffect(() => {
    if (keyword.board === "") {
      getAllBoardsData();
    }
  }, [keyword.board, getAllBoardsData]);

  // 검색어 input 관리
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword({
      ...keyword,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  // 검색어 초기화 함수
  const handleClearInput = () => {
    setKeyword({
      ...keyword,
      user: "",
      board: "",
    });
  };

  // 유저 검색 요청
  const submitUserSearch = async () => {
    try {
      const response = await getSearchUser({ keyword, accessToken });
      const resUsersCounts = response.counts;
      const resAllUsers = response.users;

      setAllUsers([...resAllUsers]);
      setAllUsersCounts(resUsersCounts);
    } catch (error) {
      throw error;
    }
  };

  // 유저 검색 엔터로 요청할 때
  const submitKeyPressUserSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword.user === "") {
      return;
    }
    if (e.charCode == 13) {
      submitUserSearch();
    }
  };

  // 게시글 검색 요청
  const submitBoardSearch = async () => {
    try {
      const response = await getSearchBoard({ keyword, accessToken });
      const resBoardsCounts = response.counts;
      const resAllBoards = response.boards;

      setAllBoardsCounts(resBoardsCounts);
      setAllBoards([...resAllBoards]);
    } catch (error) {
      throw error;
    }
  };

  // 게시글 검색 엔터로 요청할 때
  const submitKeyPressBoardSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword.board === "") {
      return;
    }
    if (e.charCode == 13) {
      submitBoardSearch();
    }
  };

  // 유저 활성화 비활성화
  const handleUserState = async () => {
    try {
      await patchUserState({ accessToken, id: getBanId });
      const response = await getAllUsers(accessToken);

      const resUsersCounts = response.counts;
      const resAllUsers = response.users;

      setAllUsers([...resAllUsers]);
      setAllUsersCounts(resUsersCounts);
    } catch (error) {
      throw error;
    } finally {
      setOpenModal(false);
    }
  };

  // 유저 게시글 삭제하기
  const handleBoardDelete = async () => {
    try {
      await deleteUserBoard({ accessToken, id: Number(getDeleteId) });
      const response = await getAllBoards(accessToken);
      const resBoardsCounts = response.counts;
      const resAllBoards = response.boards;

      setAllBoardsCounts(resBoardsCounts);
      setAllBoards([...resAllBoards]);
    } catch (error) {
      throw error;
    } finally {
      setOpenModal(false);
    }
  };

  // 반응형 햄버거 view ture, false
  useEffect(() => {
    function handleBrowserResize() {
      setBrowserWidth(document.documentElement.clientWidth);
    }
    window.addEventListener("resize", handleBrowserResize);
    // 컴포넌트 최초 실행시 한번 실행
    handleBrowserResize();

    return () => window.removeEventListener("resize", handleBrowserResize);
  }, []);

  const togleTabs = (prev: boolean) => {
    setOpenTabs(!prev);
  };

  return (
    <AdminUI
      pageTabs={pageTabs}
      setPageTabs={setPageTabs}
      openTabs={openTabs}
      openModal={openModal}
      setOpenModal={setOpenModal}
      setOpenTabs={setOpenTabs}
      browserWidth={browserWidth}
      togleTabs={togleTabs}
      allUsers={allUsers}
      allBoards={allBoards}
      keyword={keyword}
      handleSearchInput={handleSearchInput}
      submitUserSearch={submitUserSearch}
      submitBoardSearch={submitBoardSearch}
      handleUserState={handleUserState}
      handleBoardDelete={handleBoardDelete}
      setGetDeleteId={setGetDeleteId}
      getDeleteId={getDeleteId}
      setGetBanId={setGetBanId}
      getBanId={getBanId}
      userProfile={userProfile}
      handleClearInput={handleClearInput}
      submitKeyPressBoardSearch={submitKeyPressBoardSearch}
      submitKeyPressUserSearch={submitKeyPressUserSearch}
      allUsersCounts={allUsersCounts}
      allBoardsCounts={allBoardsCounts}
    />
  );
}
