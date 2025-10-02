import { useState } from 'react'
import { PortfolioManifest } from '../types/manifest'

interface ManifestEditorProps {
  manifest: PortfolioManifest
  onSave: (manifest: PortfolioManifest) => void
  onClose: () => void
}

export default function ManifestEditor({ manifest, onSave, onClose }: ManifestEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(manifest, null, 2))
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText)
      setError(null)
      onSave(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full h-full font-mono text-sm p-4 bg-black border border-cyan-400/30 text-cyan-400 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none resize-none"
          spellCheck={false}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500">
          <p className="text-red-400 text-sm font-mono">&gt; ERROR: {error}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-cyan-400/30 bg-black">
        <div className="text-sm text-cyan-400/70 font-mono">
          &gt; validate_json_before_commit
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition font-mono tracking-wider"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition font-mono tracking-wider"
          >
            COMMIT
          </button>
        </div>
      </div>
    </div>
  )
}
