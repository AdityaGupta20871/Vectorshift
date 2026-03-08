// noteNode.js - Sticky Note Node (Extra Feature)

import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const removeNode = useStore((state) => state.removeNode);
  const [note, setNote] = useState(data?.note || 'Add your notes here...');
  const [color, setColor] = useState(data?.color || '#fef08a');

  const colors = [
    { value: '#fef08a', label: '🟡 Yellow' },
    { value: '#bbf7d0', label: '🟢 Green' },
    { value: '#fecaca', label: '🔴 Red' },
    { value: '#bfdbfe', label: '🔵 Blue' },
    { value: '#e9d5ff', label: '🟣 Purple' },
  ];

  return (
    <div 
      className="base-node note-node"
      style={{ 
        background: color,
        borderColor: `${color}aa`,
      }}
    >
      <button className="node-close-btn" onClick={() => removeNode(id)}>
        <X size={14} />
      </button>
      <div className="node-header" style={{ background: 'rgba(0,0,0,0.08)', borderColor: `${color}aa` }}>
        <span className="node-title" style={{ color: '#1e293b' }}>📌 Note</span>
      </div>
      <div className="node-content">
        <div className="color-picker">
          {colors.map(c => (
            <button
              key={c.value}
              className={`color-btn ${color === c.value ? 'active' : ''}`}
              style={{ background: c.value }}
              onClick={() => setColor(c.value)}
              title={c.label}
            />
          ))}
        </div>
        <textarea
          className="note-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes..."
          rows={4}
        />
      </div>
    </div>
  );
};
