// conditionNode.js - Conditional Logic Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      className="condition-node"
      inputs={[
        { id: 'valueA', color: '#6366f1' },
        { id: 'valueB', color: '#6366f1' },
      ]}
      outputs={[
        { id: 'true', color: '#22c55e' },
        { id: 'false', color: '#ef4444' },
      ]}
    >
      <NodeField label="Condition">
        <NodeSelect 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          options={[
            { value: 'equals', label: 'Equals (==)' },
            { value: 'notEquals', label: 'Not Equals (!=)' },
            { value: 'greater', label: 'Greater Than (>)' },
            { value: 'less', label: 'Less Than (<)' },
            { value: 'contains', label: 'Contains' },
          ]}
        />
      </NodeField>
      <div className="condition-outputs">
        <span className="true-label">✓ True</span>
        <span className="false-label">✗ False</span>
      </div>
    </BaseNode>
  );
};
