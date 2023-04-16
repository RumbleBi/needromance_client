import styled from "@emotion/styled";
import { FaGithub } from "react-icons/fa";
const Wrapper = styled.footer`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoLeft = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;
export default function LayoutFooter() {
  return (
    <Wrapper>
      <InfoLeft>
        (주)로맨스가 필요해
        <br />
        대표 : 2조 조신강정김
        <br />
        고객센터 : 2222 - 1004
        <br />
        (평일 09:00~18:00/점심시간 13:00~14:00/주말 및 공휴일 휴무)
        <br />
        사업자등록번호 : 000-00-00000 <br />
        Copyright© INeedRomance(주) All rights reserved.
      </InfoLeft>
      <div>
        <FaGithub />
        Github // 아직 완성 안 했습니다!
      </div>
    </Wrapper>
  );
}
