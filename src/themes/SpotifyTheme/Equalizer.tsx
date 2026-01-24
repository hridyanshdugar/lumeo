export const Equalizer = () => {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-green-500 rounded-full"
          style={{
            animation: `equalize 0.${4 + i}s ease-in-out infinite alternate`,
            height: '100%',
          }}
        />
      ))}
      <style>{`
        @keyframes equalize {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
