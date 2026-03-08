// transformNode.js

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { BaseNode, NodeField, NodeTextarea } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformLogic, setTransformLogic] = useState(data?.transformLogic || '');

  return (
    <BaseNode
      id={id}
      title="Transform Node"
      Icon={Sparkles}
      className="transform-node"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'transformed', label: 'Transformed' }]}
    >
      <NodeField>
        <NodeTextarea
          value={transformLogic}
          onChange={(e) => setTransformLogic(e.target.value)}
          placeholder="Enter transformation logic..."
          rows={3}
        />
      </NodeField>
    </BaseNode>
  );
};
