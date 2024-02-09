interface Props extends React.PropsWithChildren {
  onClick: () => void;
}

export default function PrimaryButton({ children, onClick }: Props) {
  return (
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
