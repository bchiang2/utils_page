import { useEffect, useMemo, useState } from 'react';
import { NoteSidebar, type NoteListItem } from './Sidebar';
import { EditorPane } from './EditorPane';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { type Note, createNote as createNoteUtil } from '@/lib/notes';
import { useNotes } from './useNotes';

const INITIAL_NOTES: Note[] = [
  createNoteUtil({
    title: 'Welcome Note',
    content: '# Welcome\n\nThis is your first note. Start typing here!\n',
  }),
  createNoteUtil({
    title: 'Ideas',
    content: '- Note-taking layout\n- Keyboard shortcuts\n- Export to file\n',
  }),
  createNoteUtil({
    title: 'Todos',
    content: '- [ ] Refactor components\n- [ ] Add persistence\n',
  }),
];

function NotePage() {
  const { notes, create, updateContent, updateTitle, remove } =
    useNotes(INITIAL_NOTES);
  const [selectedId, setSelectedId] = useState<string>(notes[0]?.id ?? '');

  // Keep selection valid when notes change
  useEffect(() => {
    if (!selectedId && notes.length > 0) {
      setSelectedId(notes[0].id);
      return;
    }
    if (selectedId && !notes.find(n => n.id === selectedId)) {
      setSelectedId(notes[0]?.id ?? '');
    }
  }, [notes, selectedId]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  const sidebarItems: NoteListItem[] = useMemo(
    () => notes.map(n => ({ id: n.id, title: n.title })),
    [notes]
  );

  const handleContentChange = (newValue: string) => {
    if (!selectedId) return;
    updateContent(selectedId, newValue);
  };

  const handleNewNote = () => {
    const n = create('Untitled', '');
    setSelectedId(n.id);
  };

  const handleDeleteNote = () => {
    if (!selectedId) return;
    const idx = notes.findIndex(n => n.id === selectedId);
    const next = notes.find((_, i) => i !== idx);
    remove(selectedId);
    setSelectedId(next?.id ?? '');
  };

  return (
    <div className="h-[calc(100vh-64px)]">
      {/* Approx nav height offset */}
      <div className="flex h-full">
        {/* Sidebar */}
        <NoteSidebar
          items={sidebarItems}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {/* Editor Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <input
              type="text"
              className="w-full max-w-xl text-sm font-medium text-gray-700 bg-transparent outline-none border border-transparent focus:border-gray-300 rounded px-2 py-1"
              placeholder="Untitled"
              value={selectedNote?.title ?? ''}
              onChange={e => {
                if (!selectedId) return;
                updateTitle(selectedId, e.target.value);
              }}
              readOnly={!selectedId}
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleNewNote}>
                <Plus /> New
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDeleteNote}
                disabled={!selectedId}
              >
                <Trash /> Delete
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <EditorPane
              value={selectedNote?.content ?? ''}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
