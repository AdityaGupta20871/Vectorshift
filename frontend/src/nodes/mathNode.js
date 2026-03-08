// mathNode.js - Math Operation Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🔢"
      className="math-node"
      inputs={[
        { id: 'a', color: '#6366f1' },
        { id: 'b', color: '#6366f1' },
      ]}
      outputs={[{ id: 'result', color: '#22c55e' }]}
    >
      <NodeField label="Operation">
        <NodeSelect 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          options={[
            { value: 'add', label: 'Add (+)' },
            { value: 'subtract', label: 'Subtract (-)' },
            { value: 'multiply', label: 'Multiply (×)' },
            { value: 'divide', label: 'Divide (÷)' },
            { value: 'power', label: 'Power (^)' },
          ]}
        />
      </NodeField>
      <div className="math-preview">
        <span className="math-symbol">A {
          operation === 'add' ? '+' : 
          operation === 'subtract' ? '−' : 
          operation === 'multiply' ? '×' : 
          operation === 'divide' ? '÷' : '^'
        } B</span>
      </div>
    </BaseNode>
  );
};
