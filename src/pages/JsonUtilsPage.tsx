import { Button } from '@/components/ui/button';
import Editor from '@monaco-editor/react';
import {
  SAMPLE_JSON_DATA,
  formatJSON,
  validateJSON,
  minifyJSON,
  escapeJSONString,
  unescapeJSONString,
  isEscapedJSON,
} from '@/lib/json_utils';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2Icon, AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

function JsonUtilsPage() {
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(SAMPLE_JSON_DATA, null, 2)
  );
  const [isValidJSON, setIsValidJSON] = useState(false);

  const validationTimeoutRef = useRef<number | null>(null);

  // Debounced JSON validation
  const debouncedValidation = useCallback((content: string) => {
    if (validationTimeoutRef.current !== null) {
      window.clearTimeout(validationTimeoutRef.current);
    }

    const timeout = window.setTimeout(() => {
      const isValid = validateJSON(content);
      setIsValidJSON(isValid);
      validationTimeoutRef.current = null;
    }, 300);

    validationTimeoutRef.current = timeout;
  }, []);

  // Validate JSON when content changes
  useEffect(() => {
    debouncedValidation(jsonContent);

    return () => {
      if (validationTimeoutRef.current !== null) {
        window.clearTimeout(validationTimeoutRef.current);
        validationTimeoutRef.current = null;
      }
    };
  }, [jsonContent, debouncedValidation]);

  // Initial validation on mount
  useEffect(() => {
    const isValid = validateJSON(jsonContent);
    setIsValidJSON(isValid);
  }, [jsonContent]);

  const handleFormatJSON = () => {
    try {
      const formatted = formatJSON(jsonContent);
      setJsonContent(formatted);
      toast.success('JSON formatted successfully');
    } catch (error) {
      console.error('Error formatting JSON:', error);
    }
  };

  const handleMinifyJSON = () => {
    try {
      const minified = minifyJSON(jsonContent);
      setJsonContent(minified);
      toast.success('JSON minified successfully');
    } catch (error) {
      console.error('Error minifying JSON:', error);
    }
  };

  const handleEscapeJSON = () => {
    try {
      let result: string;
      let action: string;

      if (isEscapedJSON(jsonContent)) {
        result = unescapeJSONString(jsonContent);
        action = 'unescaped';
      } else {
        result = escapeJSONString(jsonContent);
        action = 'escaped';
      }

      setJsonContent(result);
      toast.success(`JSON ${action} successfully`);
    } catch (error) {
      console.error('Error processing JSON:', error);
    }
  };

  const handleDownloadJSON = () => {
    try {
      // Create a blob with the JSON content
      const blob = new Blob([jsonContent], { type: 'application/json' });

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.json';

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('JSON downloaded successfully');
    } catch (error) {
      console.error('Error downloading JSON:', error);
      toast.error('Failed to download JSON');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-8xl mx-auto px-4">
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Status Bar */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isValidJSON ? (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 border-emerald-200"
                >
                  <CheckCircle2Icon className="h-3 w-3 mr-1" />
                  Valid JSON
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 border-red-200"
                >
                  <AlertCircleIcon className="h-3 w-3 mr-1" />
                  Invalid JSON
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleFormatJSON}
                size="sm"
                disabled={!isValidJSON}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                Format
              </Button>
              <Button
                variant="outline"
                onClick={handleMinifyJSON}
                size="sm"
                disabled={!isValidJSON}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
              >
                Minify
              </Button>
              <Button
                variant="outline"
                onClick={handleEscapeJSON}
                size="sm"
                disabled={!isValidJSON}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
              >
                {isEscapedJSON(jsonContent) ? 'Unescape' : 'Escape'}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadJSON}
                size="sm"
                disabled={!isValidJSON}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
              >
                Download
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="h-[600px] w-full">
            <Editor
              height="100%"
              width="100%"
              defaultLanguage="json"
              value={jsonContent}
              onChange={value => {
                const newContent = value || '';
                setJsonContent(newContent);
              }}
              theme="vs"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                lineHeight: 20,
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonUtilsPage;
