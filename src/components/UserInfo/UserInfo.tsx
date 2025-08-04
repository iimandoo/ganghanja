import React from "react";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { theme } from "@/styles/theme";

export const UserInfo: React.FC = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  if (loading) {
    return <LoadingText>로딩중...</LoadingText>;
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <SignOutLink onClick={handleSignOut} disabled={loading}>
        로그아웃
      </SignOutLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const SignOutLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary.main};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  transition: ${theme.transitions.fast};

  &:hover:not(:disabled) {
    color: ${theme.colors.secondary.dark};
  }

  &:disabled {
    color: ${theme.colors.gray.medium};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const LoadingText = styled.div`
  color: ${theme.colors.gray.medium};
  font-size: ${theme.fontSize.sm};
`;
