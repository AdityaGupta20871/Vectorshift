// BaseNode.js - Abstract node component for reusable node creation

import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store';

export const BaseNode = ({ 
  id, 
  title, 
  Icon,
  children, 
  inputs = [], 
  outputs = [],
  className = '',
  minWidth = 200,
}) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div className={`base-node ${className}`} style={{ minWidth }}>
      {/* Close button */}
      <button className="node-close-btn" onClick={() => removeNode(id)}>
        <X size={14} />
      </button>

      {/* Input Handles with Labels */}
      {inputs.map((input, index) => (
        <div 
          key={`${id}-${input.id}-wrapper`}
          className="handle-wrapper handle-left"
          style={{
            top: inputs.length === 1 ? '50%' : `${((index + 1) / (inputs.length + 1)) * 100}%`,
          }}
        >
          <span className="handle-label">{input.label || input.id}</span>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            className="custom-handle"
          />
        </div>
      ))}

      {/* Node Header */}
      <div className="node-header">
        {Icon && <Icon size={16} className="node-icon" />}
        <span className="node-title">{title}</span>
      </div>

      {/* Node Content */}
      <div className="node-content">
        {children}
      </div>

      {/* Output Handles with Labels */}
      {outputs.map((output, index) => (
        <div 
          key={`${id}-${output.id}-wrapper`}
          className="handle-wrapper handle-right"
          style={{
            top: outputs.length === 1 ? '50%' : `${((index + 1) / (outputs.length + 1)) * 100}%`,
          }}
        >
          <span className="handle-label">{output.label || output.id}</span>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            className="custom-handle"
          />
        </div>
      ))}
    </div>
  );
};

// Field components for consistent styling
export const NodeField = ({ label, children }) => (
  <div className="node-field">
    {label && <label className="node-field-label">{label}</label>}
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    className="node-input"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select className="node-select" value={value} onChange={onChange}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    className="node-textarea"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
  />
);
