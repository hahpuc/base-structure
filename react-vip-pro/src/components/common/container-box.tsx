import React from "react";

interface ContainerProps extends React.PropsWithChildren<object> {
  className?: string;
}

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-white dark:bg-white/[0.03] p-6 rounded-lg border dark:border-gray-700${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
};
