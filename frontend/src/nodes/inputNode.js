// inputNode.js

import { useState } from 'react';
import { ArrowRightFromLine } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input Node"
      Icon={ArrowRightFromLine}
      className="input-node"
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <NodeField>
        <NodeInput 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          placeholder="input_1"
        />
      </NodeField>
      <NodeField>
        <NodeSelect 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
