import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type Note,
  createNote as createNoteUtil,
  loadNotes,
  saveNotes,
  updateNote as updateNoteUtil,
} from '@/lib/notes';

const SAVE_DEBOUNCE_MS = 300;

export function useNotes(initial: Note[] = []) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const loaded = loadNotes();
    return loaded.length > 0 ? loaded : initial;
  });

  // Debounced persistence
  const saveTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimerRef.current !== null)
      window.clearTimeout(saveTimerRef.current);
    const t = window.setTimeout(() => {
      saveNotes(notes);
      saveTimerRef.current = null;
    }, SAVE_DEBOUNCE_MS);
    saveTimerRef.current = t;
    return () => {
      if (saveTimerRef.current !== null)
        window.clearTimeout(saveTimerRef.current);
    };
  }, [notes]);

  const create = useCallback((title?: string, content?: string) => {
    const n = createNoteUtil({ title, content });
    setNotes(prev => [n, ...prev]);
    return n;
  }, []);

  const updateContent = useCallback((id: string, content: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? updateNoteUtil(n, { content }) : n))
    );
  }, []);

  const updateTitle = useCallback((id: string, title: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? updateNoteUtil(n, { title }) : n))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  return useMemo(
    () => ({ notes, setNotes, create, updateContent, updateTitle, remove }),
    [notes, create, updateContent, updateTitle, remove]
  );
}
