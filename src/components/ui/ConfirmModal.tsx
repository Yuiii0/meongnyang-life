import { TriangleAlert } from "lucide-react";
import Modal from "react-modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

function ConfirmModal({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  content,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center w-full h-full overflow-hidden rounded-md "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="w-full overflow-auto bg-white rounded-md shadow-xl sm:my-8 sm:align-middle sm:w-screen sm:max-w-lg">
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 sm:w-full">
          <div className="sm:flex sm:items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <TriangleAlert color="red" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            삭제
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
