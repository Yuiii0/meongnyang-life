interface LoadingSpinnerProps {
  text?: string;
}

function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-y-2 bg-opacity-80">
      <img src="images/loading.gif" alt="loading" width={180} height={48} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
