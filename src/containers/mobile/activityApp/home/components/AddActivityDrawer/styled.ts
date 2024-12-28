import { Colors, Flex } from "astarva-ui";
import styled from "styled-components";
import { css } from "styled-components";

export const StopwatchWrapper = styled(Flex)`
  height: 19.5rem;
  width: 19.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 17.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${Colors.blue50};
    z-index: -1;
    ${(props) =>
      props.active &&
      css`
        animation: soundwave 2.5s linear infinite;
      `}
  }

  @keyframes soundwave {
    0% {
      opacity: 0;
      transform: scale(.8);
    }
    25% {
      opacity: .8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.15);
    }
    75% {
      opacity: .8;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
`;
