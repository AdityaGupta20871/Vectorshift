// aggregateNode.js

import { Layers } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const AggregateNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Aggregate Node"
      Icon={Layers}
      className="aggregate-node"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
      ]}
      outputs={[{ id: 'aggregated', label: 'Aggregated' }]}
    >
      <div className="node-description">
        <p>Combine multiple inputs</p>
      </div>
    </BaseNode>
  );
};
