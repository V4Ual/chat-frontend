const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <span className="mt-1 block text-sm text-red-600">{error}</span>;
};

export default ErrorMessage;
