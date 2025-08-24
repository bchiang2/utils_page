import { Button } from "@/components/ui/button"

function JsonUtilsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Utils</h1>
          <p className="text-muted-foreground text-lg">
            Tools for working with JSON data - formatting, validation, conversion, and more
          </p>
        </div>

        <div className="grid gap-6">
          {/* JSON Formatter Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">JSON Formatter</h2>
            <div className="space-y-4">
              <textarea
                className="w-full h-32 p-3 border rounded-md bg-background text-foreground"
                placeholder="Paste your JSON here to format..."
              />
              <div className="flex gap-3">
                <Button>Format JSON</Button>
                <Button variant="outline">Minify</Button>
                <Button variant="outline">Copy</Button>
              </div>
            </div>
          </div>

          {/* JSON Validator Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">JSON Validator</h2>
            <div className="space-y-4">
              <textarea
                className="w-full h-32 p-3 border rounded-md bg-background text-foreground"
                placeholder="Paste JSON to validate..."
              />
              <div className="flex gap-3">
                <Button>Validate JSON</Button>
                <Button variant="outline">Clear</Button>
              </div>
            </div>
          </div>

          {/* JSON to Other Formats Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Convert JSON</h2>
            <p className="text-muted-foreground mb-4">
              Convert JSON to other formats like CSV, XML, or YAML
            </p>
            <div className="flex gap-3">
              <Button variant="outline">JSON to CSV</Button>
              <Button variant="outline">JSON to XML</Button>
              <Button variant="outline">JSON to YAML</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground">
          <p>🚧 This is a placeholder page. JSON utilities coming soon!</p>
        </div>
      </div>
    </div>
  )
}

export default JsonUtilsPage
