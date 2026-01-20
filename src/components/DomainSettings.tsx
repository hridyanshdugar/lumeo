import { useState, memo } from 'react'

const RESERVED_SUBDOMAINS = [
  'www', 'api', 'admin', 'app', 'dashboard',
  'mail', 'ftp', 'localhost', 'test', 'staging',
  'dev', 'blog', 'docs', 'help', 'support'
]

const DOMAIN = 'withlumeo.com'

interface DomainSettingsProps {
  currentSubdomain: string | null | undefined
  username: string
  onSave: (subdomain: string | null) => Promise<void>
  onClose: () => void
}

function validateSubdomain(subdomain: string): { valid: boolean; error?: string } {
  if (!subdomain || subdomain.trim() === '') {
    return { valid: true } // Empty is allowed (to remove subdomain)
  }

  const trimmed = subdomain.trim().toLowerCase()

  // Check length
  if (trimmed.length < 3 || trimmed.length > 63) {
    return { valid: false, error: 'Subdomain must be between 3 and 63 characters' }
  }

  // Check format: lowercase alphanumeric and hyphens only
  if (!/^[a-z0-9-]+$/.test(trimmed)) {
    return { valid: false, error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' }
  }

  // Cannot start or end with hyphen
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return { valid: false, error: 'Subdomain cannot start or end with a hyphen' }
  }

  // Check reserved subdomains
  if (RESERVED_SUBDOMAINS.includes(trimmed)) {
    return { valid: false, error: 'This subdomain is reserved and cannot be used' }
  }

  return { valid: true }
}

function DomainSettings({ currentSubdomain, username, onSave, onClose }: DomainSettingsProps) {
  // Initialize with current subdomain value - only set once on mount
  // Never update from props to prevent focus loss during re-renders
  const [subdomain, setSubdomain] = useState(() => currentSubdomain || '')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSubdomain(value)
    setValidationError(null)
    setSaveSuccess(false)

    if (value.trim() !== '') {
      const validation = validateSubdomain(value)
      if (!validation.valid) {
        setValidationError(validation.error || 'Invalid subdomain')
      }
    }
  }

  const handleSave = async () => {
    const trimmed = subdomain.trim().toLowerCase()
    
    // If empty, send null to use default (username)
    const subdomainToSave = trimmed === '' ? null : trimmed
    
    // Validate (only if not empty)
    if (subdomainToSave) {
      const validation = validateSubdomain(subdomainToSave)
      if (!validation.valid) {
        setValidationError(validation.error || 'Invalid subdomain')
        return
      }
    }

    setIsSaving(true)
    setValidationError(null)
    setSaveSuccess(false)

    try {
      await onSave(subdomainToSave)
      setSaveSuccess(true)
      // Update local state to match what was saved
      setSubdomain(subdomainToSave || '')
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Failed to save subdomain')
    } finally {
      setIsSaving(false)
    }
  }

  const fullUrl = subdomain && subdomain.trim() !== ''
    ? `https://${subdomain.trim().toLowerCase()}.${DOMAIN}`
    : 'No subdomain set'

  return (
    <div className="border-t-4 border-neutral-600 pt-4">
      <div className="space-y-4">
        {/* Current Subdomain Display */}
        <div className="bg-neutral-800 p-4 border-4 border-neutral-600">
          <p className="text-neutral-400 text-sm font-mono uppercase mb-2">&gt; Current Subdomain</p>
          <p className="text-neutral-300 font-mono text-lg">
            {currentSubdomain || username.toLowerCase()}
            {!currentSubdomain && <span className="text-neutral-500 text-sm ml-2">(default: username)</span>}
          </p>
          <p className="text-neutral-400 font-mono text-sm mt-2">
            {`https://${currentSubdomain || username.toLowerCase()}.${DOMAIN}`}
          </p>
        </div>

        {/* Input Field */}
        <div className="bg-neutral-800 p-4 border-4 border-neutral-600">
          <label className="block text-neutral-300 font-mono text-sm uppercase mb-2">
            &gt; Subdomain
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subdomain}
              onChange={handleSubdomainChange}
              placeholder={username.toLowerCase()}
              className="flex-1 px-4 py-2 bg-neutral-700 text-neutral-300 border-4 border-neutral-500 font-mono focus:outline-none focus:border-neutral-400"
              style={{ imageRendering: 'pixelated' }}
              disabled={isSaving}
            />
            <span className="text-neutral-400 font-mono">.{DOMAIN}</span>
          </div>
          {subdomain && subdomain.trim() !== '' && (
            <p className="text-neutral-500 font-mono text-xs mt-2">
              Preview: {fullUrl}
            </p>
          )}
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="bg-red-900 border-4 border-red-700 p-4">
            <p className="text-red-200 font-mono text-sm uppercase">&gt; Error</p>
            <p className="text-red-300 font-mono text-sm mt-1">{validationError}</p>
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-900 border-4 border-green-700 p-4">
            <p className="text-green-200 font-mono text-sm uppercase">&gt; Success</p>
            <p className="text-green-300 font-mono text-sm mt-1">Subdomain updated successfully!</p>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-neutral-800 p-4 border-4 border-neutral-600">
          <p className="text-neutral-400 font-mono text-xs uppercase mb-2">&gt; Rules</p>
          <ul className="text-neutral-500 font-mono text-xs space-y-1 list-disc list-inside">
            <li>3-63 characters</li>
            <li>Lowercase letters, numbers, and hyphens only</li>
            <li>Cannot start or end with hyphen</li>
            <li>Default subdomain is your username: <span className="text-neutral-300">{username.toLowerCase()}</span></li>
            <li>Leave empty to use default (username)</li>
          </ul>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving || !!validationError || subdomain.trim().toLowerCase() === (currentSubdomain || '').toLowerCase()}
          className={`w-full px-6 py-3 font-mono tracking-wider uppercase border-4 transition-all ${
            isSaving || !!validationError || subdomain.trim().toLowerCase() === (currentSubdomain || '').toLowerCase()
              ? 'bg-neutral-700 text-neutral-500 border-neutral-600 cursor-not-allowed'
              : 'bg-neutral-600 text-white border-neutral-400 hover:bg-neutral-500 hover:shadow-md'
          }`}
          style={{ imageRendering: 'pixelated' }}
        >
          {isSaving ? 'Saving...' : 'Save Subdomain'}
        </button>
      </div>
    </div>
  )
}

export default memo(DomainSettings)
