export const Input = ({ ...props }) => {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
      {...props}
    />
  );
};
