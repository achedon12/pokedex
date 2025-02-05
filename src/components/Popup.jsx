import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const Popup = ({ onClose, isOpen, showBackground = false, showCloseButton = false, children }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleEsc = (event) => {
      if (isOpen && event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        ref={popupRef}
        className={`p-4 rounded-lg shadow-lg w-auto h-auto relative  text-white overflow-y-auto  ${showBackground ? 'backdrop-blur-lg bg-gray-900 backdrop-filter bg-opacity-90' : 'bg-opacity-0'}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Close
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  showBackground: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node,
};

export default Popup;