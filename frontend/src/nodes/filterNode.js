// filterNode.js - Data Filter Node

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'includes');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  return (
    <BaseNode
      id={id}
      title="Filter Node"
      Icon={Filter}
      className="filter-node"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[
        { id: 'matched', label: 'Matched' },
        { id: 'unmatched', label: 'Unmatched' },
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
