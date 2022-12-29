import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
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

function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Return>
        <Link to={`${URL}`}>
          <img src="/../../public/home.png" />
        </Link>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Return>
    </>
  );
}
export default Header;
