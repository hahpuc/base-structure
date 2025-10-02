export const Container: React.FunctionComponent<
  React.PropsWithChildren<object>
> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-white/[0.03] p-6 rounded-lg border dark:border-gray-700">
      {children}
    </div>
  );
};
