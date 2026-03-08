// apiNode.js - API Request Node

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="Http Node"
      Icon={Globe}
      className="api-node"
      inputs={[
        { id: 'body', label: 'Body' },
        { id: 'headers', label: 'Headers' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <NodeField label="URL">
        <NodeInput 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="https://api.example.com"
        />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
