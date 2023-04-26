import { useRouter } from "next/router";
import CustomBtn from "../../../commons/buttons/CustomBtn";
import Tag from "../../../commons/hashtag/HashTag";
import { useMoveToPage } from "../../../commons/hooks/customs/useMoveToPage";
import CummunityCommentListContainer from "../../communityComment/list/CommunityCommentList.container";
import * as S from "./CommunityDetail.style";
import { getDate } from "../../../../commons/libraries/getDate";
import { DeleteBoard, GetBoard } from "../../../../commons/api/boards";
import { useEffect, useState } from "react";
import { accessToken } from "../../../../commons/api/token";
import { GetUserInfo } from "../../../../commons/api/user";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../../../commons/store/atoms";

const CommunityDetailContainer = () => {
  const router = useRouter();
  // const accessToken = useRecoilValue(accessTokenState);
  const [data, setData] = useState(null);
  const [checkUser, setCheckUser] = useState("");
  const { onClickMoveToPage } = useMoveToPage();

  const fetch = async () => {
    const result = await GetBoard(Number(router.query.communityId));
    setData(result);
  };

  // 로그인한 유저 정보
  const getUserInformation = async () => {
    const result = await GetUserInfo(accessToken); //토큰 추후에 리코일로 교체하기
    setCheckUser(result);
  };

  // 화면이 맨 처음 렌더링될 떄 데이터 가져옴
  useEffect(() => {
    fetch();
    getUserInformation();
  }, [router.query.communityId]);

  const handleDeleteBoard = async () => {
    await DeleteBoard(Number(router.query.communityId));
    await router.push("/boards");
  };

  console.log(checkUser, data);
  return (
    <S.Wrap>
      <S.CardWrap>
        {checkUser?.id === data?.user?.id && (
          <S.BtnWrap>
            <CustomBtn
              type="Sm"
              fill={false}
              text="수정"
              onClick={onClickMoveToPage(
                `/boards/${router.query.communityId}/edit`
              )}
            />
            <CustomBtn
              type="Sm"
              fill={false}
              text="삭제"
              onClick={() => handleDeleteBoard()}
            />
          </S.BtnWrap>
        )}
        <S.Title>
          <span>Q.</span>
          {data?.title}
        </S.Title>
        <S.InnerWrap>
          <S.LeftWrap>
            <S.Contents>{data?.contents}</S.Contents>
          </S.LeftWrap>
          <S.RigthWrap>
            <S.StampWrap>
              {data?.user?.profileImg ? (
                <S.ProfileImg src={data?.user?.profileImg} />
              ) : (
                <S.ProfileImg src="/img/community/default_userImg.png" />
              )}
              <S.SealImg src="/img/community/seal.png" />
            </S.StampWrap>
            <S.Nickname>{data?.user?.nickname}</S.Nickname>
          </S.RigthWrap>
        </S.InnerWrap>
        <S.FooterWrap>
          <Tag tags={data?.tags} />
          <S.CreatedAt>{getDate(data?.createdAt)}</S.CreatedAt>
          <S.View>
            <span>💌 조회수</span>
            {data?.views}
          </S.View>
        </S.FooterWrap>
      </S.CardWrap>

      <CustomBtn
        type="Md"
        fill={true}
        text="목록으로"
        onClick={onClickMoveToPage("/boards")}
      />

      <CummunityCommentListContainer
        checkUser={checkUser}
        boardId={router.query.communityId}
        writer={data?.user?.nickname}
        onlyWriter={data?.user?.id === checkUser?.id}
      />
    </S.Wrap>
  );
};

export default CommunityDetailContainer;
