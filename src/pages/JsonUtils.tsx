import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"

function JsonUtilsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-lg">
            Json Toolkit
          </p>
        </div>
        <div className="grid gap-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="space-y-4">
              <div className="border rounded-md overflow-hidden" style={{ height: '300px' }}>
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  defaultValue="// Paste your JSON here to format..."
                  theme="vs-dark"
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
                <Button>Format JSON</Button>
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
