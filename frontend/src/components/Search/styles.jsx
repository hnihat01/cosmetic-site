import styled, { css, keyframes } from "styled-components";
import SearchIcon from "./searchIcon"; // Ensure the path is correct
import ArrowRightIcon from "./arrowRight"; // Ensure the path is correct

export const Navbar = styled.nav`
  position: fixed;
  top: 9%;
  width: 60%;
  height: 60px;
  background-color: #222831;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const Container = styled.div`
  position: relative;
  width: calc(100% - 60px); // Full width minus the icon width
  height: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  border: 4px solid #393e46;
  padding: 5px;
  background: #222831;
  transition: box-shadow 0.5s, border-color 0.5s;

  display: flex;
  align-items: center;

  ${({ hover }) =>
    hover &&
    css`
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.74);
      border: 4px solid #00adb5;
    `}
`;

export const SearchInput = styled.input`
  flex-grow: 1; // Allow the input to take up all available space
  height: 42px;
  line-height: 30px;
  outline: 0;
  border: 0;
  font-size: 1rem; // Adjust font-size as needed
  border-radius: 20px;
  padding: 0 20px;
  margin: 0;
  appearance: none;

  display: block;
`;

/** icons */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: #00adb5;
  z-index: 10;
  animation: ${fadeIn} 1s linear;
`;

export const IconMagnifyingGlass = styled(SearchIcon)`
  ${IconCommonCss}
`;

export const IconRightArrow = styled(ArrowRightIcon)`
  ${IconCommonCss}
  cursor: pointer;
  &:hover {
    fill: #393e46;
  }
`;
