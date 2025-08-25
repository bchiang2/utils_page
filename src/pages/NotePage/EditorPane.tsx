import Editor from '@monaco-editor/react';

type EditorPaneProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EditorPane({ value, onChange }: EditorPaneProps) {
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="markdown"
      value={value}
      onChange={val => onChange(val ?? '')}
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
        wordWrap: 'on',
      }}
    />
  );
}
