import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PortfolioManifest } from '../types/manifest'

interface ManifestEditorProps {
  manifest: PortfolioManifest
  onSave: (manifest: PortfolioManifest) => void
  onClose: () => void
}

interface ValidationError {
  path: string
  message: string
}

function validateManifest(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // Check if data is an object
  if (!data || typeof data !== 'object') {
    errors.push({ path: 'root', message: 'Manifest must be an object' })
    return errors
  }

  // Validate personalInfo
  if (!data.personalInfo) {
    errors.push({ path: 'personalInfo', message: 'Personal info is required' })
  } else {
    if (!data.personalInfo.name || typeof data.personalInfo.name !== 'string' || !data.personalInfo.name.trim()) {
      errors.push({ path: 'personalInfo.name', message: 'Name is required' })
    }
    if (!data.personalInfo.title || typeof data.personalInfo.title !== 'string' || !data.personalInfo.title.trim()) {
      errors.push({ path: 'personalInfo.title', message: 'Title is required' })
    }
    if (!data.personalInfo.email || typeof data.personalInfo.email !== 'string' || !data.personalInfo.email.trim()) {
      errors.push({ path: 'personalInfo.email', message: 'Email is required' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
      errors.push({ path: 'personalInfo.email', message: 'Email must be valid' })
    }
    if (!data.personalInfo.bio || typeof data.personalInfo.bio !== 'string' || !data.personalInfo.bio.trim()) {
      errors.push({ path: 'personalInfo.bio', message: 'Bio is required' })
    }
    if (data.personalInfo.links && typeof data.personalInfo.links !== 'object') {
      errors.push({ path: 'personalInfo.links', message: 'Links must be an object' })
    }
  }

  // Validate experience array
  if (!Array.isArray(data.experience)) {
    errors.push({ path: 'experience', message: 'Experience must be an array' })
  } else {
    data.experience.forEach((exp: any, index: number) => {
      if (!exp.company || !exp.company.trim()) {
        errors.push({ path: `experience[${index}].company`, message: 'Company name is required' })
      }
      if (!exp.position || !exp.position.trim()) {
        errors.push({ path: `experience[${index}].position`, message: 'Position is required' })
      }
      if (!exp.startDate || !exp.startDate.trim()) {
        errors.push({ path: `experience[${index}].startDate`, message: 'Start date is required' })
      }
      if (!exp.description || !exp.description.trim()) {
        errors.push({ path: `experience[${index}].description`, message: 'Description is required' })
      }
      if (exp.achievements && !Array.isArray(exp.achievements)) {
        errors.push({ path: `experience[${index}].achievements`, message: 'Achievements must be an array' })
      }
      if (exp.technologies && !Array.isArray(exp.technologies)) {
        errors.push({ path: `experience[${index}].technologies`, message: 'Technologies must be an array' })
      }
    })
  }

  // Validate projects array
  if (!Array.isArray(data.projects)) {
    errors.push({ path: 'projects', message: 'Projects must be an array' })
  } else {
    data.projects.forEach((proj: any, index: number) => {
      if (!proj.name || !proj.name.trim()) {
        errors.push({ path: `projects[${index}].name`, message: 'Project name is required' })
      }
      if (!proj.description || !proj.description.trim()) {
        errors.push({ path: `projects[${index}].description`, message: 'Project description is required' })
      }
      if (!Array.isArray(proj.technologies)) {
        errors.push({ path: `projects[${index}].technologies`, message: 'Technologies must be an array' })
      } else if (proj.technologies.length === 0) {
        errors.push({ path: `projects[${index}].technologies`, message: 'At least one technology is required' })
      }
      if (proj.links && typeof proj.links !== 'object') {
        errors.push({ path: `projects[${index}].links`, message: 'Links must be an object' })
      }
      if (proj.highlights && !Array.isArray(proj.highlights)) {
        errors.push({ path: `projects[${index}].highlights`, message: 'Highlights must be an array' })
      }
    })
  }

  // Validate education array
  if (!Array.isArray(data.education)) {
    errors.push({ path: 'education', message: 'Education must be an array' })
  } else {
    data.education.forEach((edu: any, index: number) => {
      if (!edu.institution || !edu.institution.trim()) {
        errors.push({ path: `education[${index}].institution`, message: 'Institution is required' })
      }
      if (!edu.degree || !edu.degree.trim()) {
        errors.push({ path: `education[${index}].degree`, message: 'Degree is required' })
      }
      if (!edu.field || !edu.field.trim()) {
        errors.push({ path: `education[${index}].field`, message: 'Field of study is required' })
      }
      if (!edu.startDate || !edu.startDate.trim()) {
        errors.push({ path: `education[${index}].startDate`, message: 'Start date is required' })
      }
      if (edu.achievements && !Array.isArray(edu.achievements)) {
        errors.push({ path: `education[${index}].achievements`, message: 'Achievements must be an array' })
      }
    })
  }

  // Validate skills array
  if (!Array.isArray(data.skills)) {
    errors.push({ path: 'skills', message: 'Skills must be an array' })
  } else {
    data.skills.forEach((skill: any, index: number) => {
      if (!skill.category || !skill.category.trim()) {
        errors.push({ path: `skills[${index}].category`, message: 'Skill category is required' })
      }
      if (!Array.isArray(skill.items)) {
        errors.push({ path: `skills[${index}].items`, message: 'Skill items must be an array' })
      } else if (skill.items.length === 0) {
        errors.push({ path: `skills[${index}].items`, message: 'At least one skill item is required' })
      }
    })
  }

  return errors
}

export default function ManifestEditor({ manifest, onSave, onClose }: ManifestEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(manifest, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const errors = validateManifest(parsed)

      if (errors.length > 0) {
        setValidationErrors(errors)
        setError('Validation failed. Please fix the errors below.')
        return
      }

      setError(null)
      setValidationErrors([])
      onSave(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setValidationErrors([])
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with Info Link */}
      <div className="p-4 border-b border-cyan-400/30 bg-black flex items-center justify-between">
        <div className="text-sm text-cyan-400/70 font-mono">
          &gt; manifest_editor
        </div>
        <Link
          to="/manifest-info"
          target="_blank"
          className="px-4 py-1.5 border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition font-mono text-xs tracking-wider"
        >
          FIELD GUIDE
        </Link>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full h-full font-mono text-sm p-4 bg-black border border-cyan-400/30 text-cyan-400 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none resize-none"
          spellCheck={false}
        />
      </div>

      {/* Error Messages */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500">
          <p className="text-red-400 text-sm font-mono">&gt; ERROR: {error}</p>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="max-h-40 overflow-y-auto bg-red-500/10 border border-red-500">
          <div className="p-3">
            <p className="text-red-400 text-sm font-mono font-bold mb-2">&gt; VALIDATION ERRORS:</p>
            {validationErrors.map((err, index) => (
              <p key={index} className="text-red-400 text-xs font-mono ml-4 mb-1">
                • {err.path}: {err.message}
              </p>
            ))}
          </div>
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
