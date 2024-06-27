import { useModalStore } from "@/stores/modal/useModalStore";

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore();

  const handleClickBackdrop = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickBackdrop}
    >
      <div className="relative w-screen h-screen max-w-3xl bg-white shadow-lg">
        <button
          className="absolute text-black top-4 right-4"
          onClick={closeModal}
        >
          X
        </button>
        <div className="w-full h-full overflow-y-auto">{content}</div>
      </div>
    </div>
  );
}
