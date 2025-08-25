export type NoteListItem = {
  id: string;
  title: string;
};

type NoteSidebarProps = {
  items: NoteListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function NoteSidebar({ items, selectedId, onSelect }: NoteSidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Notes</h3>
      </div>
      <nav className="py-2 overflow-y-auto flex-1">
        {items.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500">No notes yet</div>
        ) : (
          <ul className="space-y-0.5">
            {items.map(item => {
              const isActive = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={[
                      'w-full text-left px-4 py-2 text-sm',
                      'transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
}
