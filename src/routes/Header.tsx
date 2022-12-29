import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

import { URL } from "../Router";

const Return = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  a {
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0);
  margin-right: 5px;
  padding: 3px;
  &:hover {
    border: 1px solid ${(props) => props.theme.accentColor};
  }
`;

function Header() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Return>
        <Link to={`${URL}`}>
          <Img src={`${process.env.PUBLIC_URL}/home.png`} />
        </Link>
        <Button onClick={toggleDarkAtom}>
          <Img
            src={
              isDark
                ? `${process.env.PUBLIC_URL}/light.png`
                : `${process.env.PUBLIC_URL}/dark.png`
            }
          />
        </Button>
      </Return>
    </>
  );
}
export default Header;
