// BaseNode.js - Abstract node component for reusable node creation

import { Handle, Position } from 'reactflow';

const handleStyles = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid #fff',
};

export const BaseNode = ({ 
  id, 
  title, 
  icon,
  children, 
  inputs = [], 
  outputs = [],
  style = {},
  className = '',
  minWidth = 220,
  minHeight = 'auto',
}) => {
  const totalInputs = inputs.length;
  const totalOutputs = outputs.length;

  return (
    <div 
      className={`base-node ${className}`}
      style={{ 
        minWidth, 
        minHeight,
        ...style 
      }}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            ...handleStyles,
            top: totalInputs === 1 ? '50%' : `${((index + 1) / (totalInputs + 1)) * 100}%`,
            background: input.color || '#6366f1',
          }}
        />
      ))}

      {/* Node Header */}
      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
      </div>

      {/* Node Content */}
      <div className="node-content">
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`${id}-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            ...handleStyles,
            top: totalOutputs === 1 ? '50%' : `${((index + 1) / (totalOutputs + 1)) * 100}%`,
            background: output.color || '#22c55e',
          }}
        />
      ))}
    </div>
  );
};

// Field components for consistent styling
export const NodeField = ({ label, children }) => (
  <div className="node-field">
    <label className="node-field-label">{label}</label>
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
