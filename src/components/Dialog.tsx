interface DialogProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
  type?: 'error' | 'success' | 'info'
}

export default function Dialog({ isOpen, title, message, onClose, type = 'info' }: DialogProps) {
  if (!isOpen) return null

  const borderColor = {
    error: 'border-red-400',
    success: 'border-green-400',
    info: 'border-cyan-400'
  }[type]

  const textColor = {
    error: 'text-red-400',
    success: 'text-green-400',
    info: 'text-cyan-400'
  }[type]

  const messageColor = {
    error: 'text-red-300',
    success: 'text-green-300',
    info: 'text-cyan-300'
  }[type]

  const shadowColor = {
    error: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
    success: 'shadow-[0_0_50px_rgba(34,197,94,0.3)]',
    info: 'shadow-[0_0_50px_rgba(0,243,255,0.3)]'
  }[type]

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className={`bg-black border-2 ${borderColor} ${shadowColor} w-full max-w-md p-6`}>
        <h2 className={`text-xl font-bold ${textColor} tracking-wider mb-4`}>{title}</h2>
        <p className={`${messageColor} font-mono mb-6 text-base`}>&gt; {message}</p>
        <button
          onClick={onClose}
          className={`w-full px-6 py-3 border-2 transition font-mono tracking-wider ${
            type === 'error'
              ? 'bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              : type === 'success'
              ? 'bg-green-500/20 border-green-400 text-green-400 hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]'
              : 'bg-cyan-500/20 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]'
          }`}
        >
          OK
        </button>
      </div>
    </div>
  )
}
