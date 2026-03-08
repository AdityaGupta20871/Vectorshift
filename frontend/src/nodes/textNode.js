// textNode.js

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText, X } from 'lucide-react';
import { useStore } from '../store';

// Extract valid JavaScript variable names from double curly brackets
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  const removeNode = useStore((state) => state.removeNode);

  // Extract variables from text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate dynamic width based on content
  const minWidth = Math.max(180, Math.min(300, currText.length * 6));

  return (
    <div 
      className="base-node text-node"
      style={{ minWidth: `${minWidth}px` }}
    >
      {/* Close button */}
      <button className="node-close-btn" onClick={() => removeNode(id)}>
        <X size={14} />
      </button>

      {/* Dynamic Variable Handles with Labels */}
      {variables.map((variable, index) => (
        <div 
          key={`${id}-${variable}-wrapper`}
          className="handle-wrapper handle-left"
          style={{
            top: variables.length === 1 
              ? '50%' 
              : `${((index + 1) / (variables.length + 1)) * 100}%`,
          }}
        >
          <span className="handle-label">{variable}</span>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            className="custom-handle"
          />
        </div>
      ))}

      {/* Node Header */}
      <div className="node-header">
        <FileText size={16} className="node-icon" />
        <span className="node-title">Text Node</span>
      </div>

      {/* Node Content */}
      <div className="node-content">
        <div className="node-field">
          <label className="node-field-label">TEXT</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="20"
            rows={1}
          />
        </div>
      </div>

      {/* Output Handle with Label */}
      <div 
        className="handle-wrapper handle-right"
        style={{ top: '50%' }}
      >
        <span className="handle-label">Output</span>
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
          className="custom-handle"
        />
      </div>
    </div>
  );
}
