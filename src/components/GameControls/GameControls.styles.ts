import styled from "styled-components";
import { theme } from "@/styles/theme";
import { buttonBase } from "@/styles/mixins";

export const SideButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  ${buttonBase}
  position: absolute;
  top: 50%;
  min-width: 70px;
  height: 100%;
  padding: 0;
  font-size: 2rem;
  border: none;
  background: transparent;
  color: ${theme.colors.gray.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.floating};

  &.previous {
    left: 50%;
    transform: translate(-280px, -50%);
  }

  &.next {
    left: 50%;
    transform: translate(210px, -50%);
  }

  &:hover:not(:disabled) {
    color: ${theme.colors.primary.dark};
    box-shadow: 0px 3px 10px rgba(193, 255, 114, 0.4);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: 50px;
    font-size: 1.4rem;

    &.previous {
      left: 50%;
      transform: translate(-240px, -50%);
    }

    &.next {
      left: 50%;
      transform: translate(190px, -50%);
    }

    &:hover:not(:disabled) {
      &.previous {
      }

      &.next {
      }
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 40px;
    font-size: 1.4rem;

    &.previous {
      left: 50%;
      transform: translate(-180px, -50%);
    }

    &.next {
      left: 50%;
      transform: translate(140px, -50%);
    }
  }
`;
