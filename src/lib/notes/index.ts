export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type NotesSchemaV1 = {
  version: 1;
  notes: Note[];
};

const STORAGE_KEY = 'notes.v1';

function nowISO() {
  return new Date().toISOString();
}

export function generateId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  // Fallback: timestamp + random
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);

    const isString = (v: unknown): v is string => typeof v === 'string';
    const isNote = (v: unknown): v is Note => {
      if (typeof v !== 'object' || v === null) return false;
      const o = v as Record<string, unknown>;
      return (
        isString(o.id) &&
        isString(o.title) &&
        isString(o.content) &&
        isString(o.createdAt) &&
        isString(o.updatedAt)
      );
    };

    const isSchemaV1 = (v: unknown): v is NotesSchemaV1 => {
      if (typeof v !== 'object' || v === null) return false;
      const o = v as Record<string, unknown>;
      return (
        (o as { version?: unknown }).version === 1 &&
        Array.isArray((o as { notes?: unknown }).notes) &&
        ((o as { notes: unknown }).notes as unknown[]).every(isNote)
      );
    };

    if (isSchemaV1(parsed)) return parsed.notes;
    return [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  if (typeof window === 'undefined') return;
  const payload: NotesSchemaV1 = { version: 1, notes };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota errors
  }
}

export function createNote({
  title = 'Untitled',
  content = '',
}: { title?: string; content?: string } = {}): Note {
  const ts = nowISO();
  return { id: generateId(), title, content, createdAt: ts, updatedAt: ts };
}

export function updateNote(
  note: Note,
  patch: Partial<Pick<Note, 'title' | 'content'>>
): Note {
  return { ...note, ...patch, updatedAt: nowISO() };
}
