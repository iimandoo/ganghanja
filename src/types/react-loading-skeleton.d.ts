declare module "react-loading-skeleton" {
  import { ComponentType, CSSProperties } from "react";

  export interface SkeletonProps {
    count?: number;
    duration?: number;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    borderRadius?: string | number;
    baseColor?: string;
    highlightColor?: string;
    style?: CSSProperties;
    className?: string;
    containerClassName?: string;
    containerStyle?: CSSProperties;
    wrapper?: ComponentType<any>;
    enableAnimation?: boolean;
  }

  const Skeleton: ComponentType<SkeletonProps>;
  export default Skeleton;
}

declare module "react-loading-skeleton/dist/skeleton.css" {
  const content: string;
  export default content;
}
