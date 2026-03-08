// textNode.js

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

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
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

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
  const minWidth = Math.max(220, Math.min(400, currText.length * 7));

  return (
    <div 
      className="base-node text-node"
      style={{ 
        minWidth: `${minWidth}px`,
        minHeight: 'auto',
      }}
    >
      {/* Dynamic Variable Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: variables.length === 1 
              ? '50%' 
              : `${((index + 1) / (variables.length + 1)) * 100}%`,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: '#6366f1',
          }}
        />
      ))}

      {/* Node Header */}
      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
      </div>

      {/* Variable Labels */}
      {variables.length > 0 && (
        <div className="variable-labels">
          {variables.map((variable, index) => (
            <div 
              key={variable} 
              className="variable-label"
              style={{
                top: variables.length === 1 
                  ? '50%' 
                  : `${((index + 1) / (variables.length + 1)) * 100}%`,
              }}
            >
              {variable}
            </div>
          ))}
        </div>
      )}

      {/* Node Content */}
      <div className="node-content">
        <div className="node-field">
          <label className="node-field-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text with {{variables}}..."
            rows={2}
          />
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '2px solid #fff',
          background: '#22c55e',
        }}
      />
    </div>
  );
}
