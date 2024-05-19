import React from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  zIndex?: string;
}

const Modal = ({ isOpen, children, onClose, zIndex }: Props) => {
  return createPortal(
    <div
      className="modal"
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    >
      <div
        onClick={onClose}
        className="fixed inset-0 z-20 h-full max-h-screen w-full"
      />

      {children}
    </div>,
    document.getElementById("root") as Element,
  );
};

export default Modal;