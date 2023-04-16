import styled from "@emotion/styled";

const Wrapper = styled.header`
  width: 100vw;
  height: 77px;
  // 양쪽에 꽉차게 하기 위한 옵션
  position: relative;
  left: calc(-50vw + 50%);
  background-color: var(--sub-bg-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 20px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 53px;
`;

export default function LayoutHeader() {
  return (
    <Wrapper>
      <Logo>
        <LogoImage src="img/logo/INR_logo.png" />
        <span>로맨스가 필요해</span>
      </Logo>
    </Wrapper>
  );
}
