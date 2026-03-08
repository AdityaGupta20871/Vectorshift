// filterNode.js - Data Filter Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'includes');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      className="filter-node"
      inputs={[{ id: 'data', color: '#6366f1' }]}
      outputs={[
        { id: 'matched', color: '#22c55e' },
        { id: 'unmatched', color: '#f59e0b' },
      ]}
    >
      <NodeField label="Filter Type">
        <NodeSelect 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          options={[
            { value: 'includes', label: 'Includes' },
            { value: 'startsWith', label: 'Starts With' },
            { value: 'endsWith', label: 'Ends With' },
            { value: 'regex', label: 'Regex Match' },
          ]}
        />
      </NodeField>
      <NodeField label="Value">
        <NodeInput 
          value={filterValue} 
          onChange={(e) => setFilterValue(e.target.value)} 
          placeholder="Filter value..."
        />
      </NodeField>
    </BaseNode>
  );
};
