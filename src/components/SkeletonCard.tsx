import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonContainer = styled.div`
  width: 480px;
  height: 600px;
  background: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 360px;
    height: 470px;
  }
  @media (max-width: 480px) {
    width: 280px;
    height: 370px;
  }
`;

const SkeletonTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SkeletonMeaning = styled.div`
  width: 80%;
  margin-bottom: 5px;
`;

export const SkeletonCard: React.FC = () => {
  return (
    <SkeletonContainer>
      <SkeletonTextContainer>
        <SkeletonMeaning>
          <Skeleton
            height={24}
            width="100%"
            baseColor="#e9ecef"
            highlightColor="#f8f9fa"
            duration={1.5}
          />
        </SkeletonMeaning>
        <SkeletonMeaning>
          <Skeleton
            height={24}
            width="100%"
            baseColor="#e9ecef"
            highlightColor="#f8f9fa"
            duration={1.5}
          />
        </SkeletonMeaning>
        <SkeletonMeaning>
          <Skeleton
            height={24}
            width="100%"
            baseColor="#e9ecef"
            highlightColor="#f8f9fa"
            duration={1.5}
          />
        </SkeletonMeaning>
        <SkeletonMeaning>
          <Skeleton
            height={24}
            width="100%"
            baseColor="#e9ecef"
            highlightColor="#f8f9fa"
            duration={1.5}
          />
        </SkeletonMeaning>
        <SkeletonMeaning>
          <Skeleton
            height={24}
            width="100%"
            baseColor="#e9ecef"
            highlightColor="#f8f9fa"
            duration={1.5}
          />
        </SkeletonMeaning>
      </SkeletonTextContainer>
    </SkeletonContainer>
  );
};
