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
    color: #475569;
    box-shadow: 0px 3px 10px #b7e1ea;
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
    position: absolute;
    top: auto;
    bottom: -50px;
    min-width: 40px;
    width: 25%;
    height: 40px;
    font-size: 1.4rem;
    z-index: ${theme.zIndex.floating};
    transform: none;

    &.previous {
      left: 30%;
      transform: translateX(-50%);
    }

    &.next {
      right: 30%;
      left: auto;
      transform: translateX(50%);
    }

    &:hover:not(:disabled) {
      &.previous {
        transform: translateX(-50%);
      }

      &.next {
        transform: translateX(50%);
      }
    }
  }
`;
