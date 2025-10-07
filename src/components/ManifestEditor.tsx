import { useState } from 'react'
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
      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full h-full font-mono text-sm p-4 bg-neutral-900 border-2 border-neutral-600 text-neutral-200 focus:border-neutral-500 focus:shadow-md outline-none resize-none"
          spellCheck={false}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Error Messages */}
      {error && (
        <div className="p-3 bg-red-100 border-t-4 border-red-700">
          <p className="text-red-800 text-sm font-mono uppercase">&gt; ERROR: {error}</p>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="max-h-40 overflow-y-auto bg-red-100 border-t-4 border-red-700">
          <div className="p-3">
            <p className="text-red-800 text-sm font-mono font-bold mb-2 uppercase">&gt; Validation Errors:</p>
            {validationErrors.map((err, index) => (
              <p key={index} className="text-red-700 text-xs font-mono ml-4 mb-1">
                • {err.path}: {err.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t-4 border-neutral-600 bg-neutral-800">
        <div className="text-sm text-neutral-400 font-mono uppercase">
          &gt; Validate Before Save
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border-3 border-neutral-500 bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:border-neutral-400 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
            style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-neutral-600 border-4 border-neutral-400 text-white hover:bg-neutral-500 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
            style={{ imageRendering: 'pixelated' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
