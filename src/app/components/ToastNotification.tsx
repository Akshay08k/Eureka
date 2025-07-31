import React, { useState, useEffect } from "react";
import { FaX, FaCircleCheck, FaInfo } from "react-icons/fa6";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

// Toast types
type ToastType = "success" | "error" | "warning" | "info";

interface ToastMessageProps {
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  persistent?: boolean;
  onClose?: () => void;
  className?: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  type,
  message,
  title,
  duration = 5000,
  persistent = false,
  onClose,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation
    setIsAnimating(true);

    // Auto dismiss
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, persistent]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Wait for animation to complete
  };

  const getToastStyles = (type: ToastType) => {
    const baseStyles =
      "relative flex items-start gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 hover:shadow-xl max-w-md";

    switch (type) {
      case "success":
        return `${baseStyles} bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200`;
      case "error":
        return `${baseStyles} bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200`;
      case "warning":
        return `${baseStyles} bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200`;
      case "info":
        return `${baseStyles} bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200`;
      default:
        return `${baseStyles} bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200`;
    }
  };

  const getIcon = (type: ToastType) => {
    const iconProps = { size: 20, className: "flex-shrink-0 mt-0.5" };

    switch (type) {
      case "success":
        return (
          <FaCircleCheck
            {...iconProps}
            className={`${iconProps.className} text-emerald-600 dark:text-emerald-400`}
          />
        );
      case "error":
        return (
          <FiAlertCircle
            {...iconProps}
            className={`${iconProps.className} text-red-600 dark:text-red-400`}
          />
        );
      case "warning":
        return (
          <FiAlertTriangle
            {...iconProps}
            className={`${iconProps.className} text-amber-600 dark:text-amber-400`}
          />
        );
      case "info":
        return (
          <FaInfo
            {...iconProps}
            className={`${iconProps.className} text-blue-600 dark:text-blue-400`}
          />
        );
      default:
        return <FaInfo {...iconProps} />;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes toastSlideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes toastSlideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes toastProgress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .toast-enter {
          animation: toastSlideIn 0.3s ease-out forwards;
        }

        .toast-exit {
          animation: toastSlideOut 0.3s ease-out forwards;
        }
      `}</style>

      <div
        className={`
          ${getToastStyles(type)} 
          ${className}
          ${isAnimating ? "toast-enter" : ""}
          ${!isVisible ? "toast-exit" : ""}
        `}
      >
        {getIcon(type)}

        <div className="flex-1">
          {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
          <p className="text-sm opacity-90">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors duration-200"
          aria-label="Close notification"
        >
          <FaX size={16} className="opacity-60 hover:opacity-100" />
        </button>

        {/* Progress bar for non-persistent toasts */}
        {!persistent && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-current opacity-30"
              style={{
                animation: `toastProgress ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ToastMessage;
