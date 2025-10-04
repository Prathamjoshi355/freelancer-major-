import React from "react";

interface GoogleAuthButtonProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function GoogleAuthButton({
  label = "Sign in with Google",
  className = "",
  disabled = false,
  loading = false,
  onClick,
}: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-md"
      } ${className}`}
    >
      {/* Google Icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path fill="#4285F4" d="M533.5 278.4c0-18.6-1.5-37-4.6-54.6H272v103.3h146.9c-6.3 34-25.3 62.8-54 82.1v68.3h87.1c51-47 80.5-116 80.5-199.1z" />
        <path fill="#34A853" d="M272 544.3c73.8 0 135.8-24.5 181-66.6l-87.1-68.3c-24.2 16.3-55.2 25.9-93.9 25.9-72 0-133-48.6-154.8-114.9H27.1v72.3C72.2 493 165 544.3 272 544.3z" />
        <path fill="#FBBC05" d="M117.2 325.3c-10.8-32.3-10.8-67 0-99.3V153.7H27.1c-39.6 77-39.6 167.3 0 244.3l90.1-72.7z" />
        <path fill="#EA4335" d="M272 107.7c39.8-.6 78 14.6 107.1 41.7l80.5-80.5C407.7 24.7 345.7 0 272 0 165 0 72.2 51.3 27.1 153.7l90.1 72.3C139 156.3 200 107.7 272 107.7z" />
      </svg>

      <span className="text-sm font-semibold">{loading ? "Processing..." : label}</span>
    </button>
  );
}