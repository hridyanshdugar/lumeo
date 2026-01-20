import { useState } from 'react'

const RESERVED_SUBDOMAINS = ['www', 'api', 'admin', 'app', 'dashboard', 'mail', 'ftp', 'localhost', 'test', 'staging', 'dev', 'blog', 'docs', 'help', 'support']
const DOMAIN = 'withlumeo.com'

interface Props {
  currentSubdomain: string | null | undefined
  username: string
  onSave: (subdomain: string | null) => Promise<void>
}

function validate(subdomain: string): string | null {
  if (!subdomain) return null
  const s = subdomain.trim().toLowerCase()
  if (s.length < 3 || s.length > 63) return 'Must be 3-63 characters'
  if (!/^[a-z0-9-]+$/.test(s)) return 'Only lowercase letters, numbers, and hyphens'
  if (s.startsWith('-') || s.endsWith('-')) return 'Cannot start or end with hyphen'
  if (RESERVED_SUBDOMAINS.includes(s)) return 'This subdomain is reserved'
  return null
}

export default function DomainSettings({ currentSubdomain, username, onSave }: Props) {
  const [subdomain, setSubdomain] = useState(currentSubdomain || '')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSubdomain(value)
    setError(validate(value))
    setSuccess(false)
  }

  const handleSave = async () => {
    const value = subdomain.trim().toLowerCase() || null
    if (value && validate(value)) return

    setSaving(true)
    setError(null)
    try {
      await onSave(value)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const current = currentSubdomain || username.toLowerCase()
  const preview = subdomain.trim().toLowerCase() || current
  const unchanged = preview === current

  return (
    <div className="space-y-4">
      {/* Current */}
      <div className="bg-neutral-800 p-4 border-4 border-neutral-600">
        <p className="text-neutral-400 text-sm font-mono uppercase mb-1">&gt; Current</p>
        <p className="text-neutral-300 font-mono">{current}.{DOMAIN}</p>
      </div>

      {/* Input */}
      <div className="bg-neutral-800 p-4 border-4 border-neutral-600">
        <label className="block text-neutral-300 font-mono text-sm uppercase mb-2">&gt; New Subdomain</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={subdomain}
            onChange={handleChange}
            placeholder={username.toLowerCase()}
            disabled={saving}
            className="flex-1 px-4 py-2 bg-neutral-700 text-neutral-300 border-4 border-neutral-500 font-mono focus:outline-none focus:border-neutral-400"
          />
          <span className="text-neutral-400 font-mono">.{DOMAIN}</span>
        </div>
        {subdomain && <p className="text-neutral-500 font-mono text-xs mt-2">Preview: {preview}.{DOMAIN}</p>}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900 border-4 border-red-700 p-3">
          <p className="text-red-300 font-mono text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-900 border-4 border-green-700 p-3">
          <p className="text-green-300 font-mono text-sm">Subdomain updated!</p>
        </div>
      )}

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving || !!error || unchanged}
        className={`w-full px-6 py-3 font-mono uppercase border-4 transition-all ${
          saving || !!error || unchanged
            ? 'bg-neutral-700 text-neutral-500 border-neutral-600 cursor-not-allowed'
            : 'bg-neutral-600 text-white border-neutral-400 hover:bg-neutral-500'
        }`}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
