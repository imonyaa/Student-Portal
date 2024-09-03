const ErrorMessage = ({ error, className = "" }) => {
  return (
    <p className={`text-red-500 text-sm w-full px-6 text-start ${className}`}>
      {error}
    </p>
  );
};
export default ErrorMessage;
