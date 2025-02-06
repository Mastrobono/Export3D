import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  classNames?: string;
}

export default function Container({ children, classNames }: ContainerProps) {
  return (
    <div className={`mx-auto w-[calc(100%-6rem)] min-h-[80vh] rounded-md bg-lightGrey shadow-xl my-12 ${classNames}`}>
      {children}
    </div>
  );
}
