interface DialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'error' | 'success' | 'info';
}

export default function Dialog({ isOpen, title, message, onClose, type = 'info' }: DialogProps) {
  if (!isOpen) return null;

  const borderColor = {
    error: 'border-red-700',
    success: 'border-green-700',
    info: 'border-neutral-500',
  }[type];

  const headerColor = {
    error: 'bg-red-200',
    success: 'bg-green-200',
    info: 'bg-neutral-200',
  }[type];

  const textColor = {
    error: 'text-red-800',
    success: 'text-green-800',
    info: 'text-neutral-800',
  }[type];

  const messageColor = {
    error: 'text-red-700',
    success: 'text-green-700',
    info: 'text-neutral-700',
  }[type];

  return (
    <div className="fixed inset-0 bg-neutral-900/80 z-50 flex items-center justify-center p-4" style={{ imageRendering: 'pixelated' }}>
      <div className={`bg-white border-4 ${borderColor} shadow-lg w-full max-w-md`}>
        <div className={`p-4 border-b-4 ${borderColor} ${headerColor}`}>
          <h2 className={`text-xl font-bold ${textColor} tracking-wider uppercase`}>{title}</h2>
        </div>
        <div className="p-6">
          <p className={`${messageColor} font-mono mb-6 text-base`}>&gt; {message}</p>
          <button
            onClick={onClose}
            className={`w-full px-6 py-3 border-4 transition font-mono tracking-wider uppercase shadow-sm ${
              type === 'error'
                ? 'bg-red-700 border-red-500 text-white hover:bg-red-600 hover:shadow-md'
                : type === 'success'
                ? 'bg-green-700 border-green-500 text-white hover:bg-green-600 hover:shadow-md'
                : 'bg-neutral-700 border-neutral-500 text-white hover:bg-neutral-600 hover:shadow-md'
            }`}
            style={{ imageRendering: 'pixelated' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
