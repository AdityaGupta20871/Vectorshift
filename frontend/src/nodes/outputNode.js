// outputNode.js

import { useState } from 'react';
import { ArrowRightToLine } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output Node"
      Icon={ArrowRightToLine}
      className="output-node"
      inputs={[{ id: 'input', label: 'Input' }]}
    >
      <NodeField>
        <NodeInput 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          placeholder="output_1"
        />
      </NodeField>
      <NodeField>
        <NodeSelect 
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
