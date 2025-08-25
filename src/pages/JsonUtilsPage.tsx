import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"
import { SAMPLE_JSON_DATA, formatJSON, validateJSON } from "@/lib/json_utils"
import { useRef, useState, useEffect, useCallback } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

function JsonUtilsPage() {
  const editorRef = useRef<any>(null)
  const [jsonContent, setJsonContent] = useState(JSON.stringify(SAMPLE_JSON_DATA, null, 2))
  const [isValidJSON, setIsValidJSON] = useState(false)
  
  // Debug logging for state changes
  useEffect(() => {
    console.log('isValidJSON state changed to:', isValidJSON)
  }, [isValidJSON])
  const [validationTimeout, setValidationTimeout] = useState<NodeJS.Timeout | null>(null)

  // Debounced JSON validation
  const debouncedValidation = useCallback((content: string) => {
    if (validationTimeout) {
      clearTimeout(validationTimeout)
    }
    
    const timeout = setTimeout(() => {
      const isValid = validateJSON(content)
      console.log('Validating JSON:', { content: content.substring(0, 50) + '...', isValid })
      setIsValidJSON(isValid)
    }, 300) // 300ms debounce delay
    
    setValidationTimeout(timeout)
  }, [validationTimeout])

  // Validate JSON when content changes
  useEffect(() => {
    debouncedValidation(jsonContent)
    
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout)
      }
    }
  }, [jsonContent, debouncedValidation, validationTimeout])

  // Initial validation on mount
  useEffect(() => {
    const isValid = validateJSON(jsonContent)
    console.log('Initial validation:', { isValid })
    setIsValidJSON(isValid)
    
    // Test validation function with invalid JSON
    const testInvalid = validateJSON('{"invalid": json}')
    console.log('Test invalid JSON validation:', { testInvalid })
  }, [])

  const handleFormatJSON = () => {
    try {
      const formatted = formatJSON(jsonContent)
      setJsonContent(formatted)
    } catch (error) {
      // Error handling is now done through the continuous validation
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
              <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Json Toolkit
          </p>
        </div>
        <div className="grid gap-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="space-y-4">
              {/* JSON Validation Status */}
              {!isValidJSON ? (
                <Alert variant="destructive">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertDescription>
                    Invalid JSON format. Please check your syntax.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                    Valid JSON
                  </Badge>
                </div>
              )}
              
              <div className="border rounded-md overflow-hidden" style={{ height: '31.25rem' }}>
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={jsonContent}
                  onChange={(value) => {
                    const newContent = value || ""
                    setJsonContent(newContent)
                    // Trigger immediate validation for better UX
                    debouncedValidation(newContent)
                  }}
                  theme="vs"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleFormatJSON}>Format JSON</Button>
                <Button variant="outline">Minify</Button>
                <Button variant="outline">Copy</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JsonUtilsPage
