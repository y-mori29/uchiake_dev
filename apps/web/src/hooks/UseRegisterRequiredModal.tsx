import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface RegisterModalState {
  isOpen: boolean;
  message: string;
}

interface RegisterModalContextType {
  openRegisterModal: (message: string) => void;
  closeRegisterModal: () => void;
}

const UseRegisterRequiredModal = createContext<RegisterModalContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const RegisterModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<RegisterModalState>({ isOpen: false, message: "" });

  const openRegisterModal = (message: string) => {
    setModalState({ isOpen: true, message });
  };

  const closeRegisterModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <UseRegisterRequiredModal.Provider value={{ openRegisterModal, closeRegisterModal }}>
      {children}
      {modalState.isOpen && (
        <RegisterRequiredModal message={modalState.message} onClose={closeRegisterModal} />
      )}
    </UseRegisterRequiredModal.Provider>
  );
};

export const useRegisterRequiredModal = (): RegisterModalContextType => {
  const context = useContext(UseRegisterRequiredModal);
  if (!context) {
    throw new Error("useRegisterRequiredModal must be used within a RegisterModalProvider");
  }
  return context;
};

interface RegisterRequiredModalProps {
  message: string;
  onClose: () => void;
}

const RegisterRequiredModal: React.FC<RegisterRequiredModalProps> = ({ message, onClose }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login",
      },
    });
  };

  const handleSignUp = async () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg z-20 max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <XMarkIcon className="size-6" />
        </button>
        <h2
          className="text-xl font-semibold mb-4 mt-4">より素敵な体験をしていただくために、ログインまたは新規登録をお願いします！</h2>
        <p className="mb-4">{message}には、ログインまたは新規登録が必要です！</p>
        <div className="flex items-center justify-center w-full space-x-4">
          <button
            className="cursor-pointer rounded-full bg-amber-600 px-4 py-2 text-sm text-white shadow-md hover:bg-amber-700"
            onClick={() => {
              handleLogin();
              onClose();
            }}
          >
            ログイン
          </button>
          <button
            className="cursor-pointer rounded-full bg-amber-600 px-4 py-2 text-sm text-white shadow-md hover:bg-amber-700"
            onClick={() => {
              handleSignUp();
              onClose();
            }}
          >
            新規登録
          </button>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gray-500 opacity-75 z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default useRegisterRequiredModal;
