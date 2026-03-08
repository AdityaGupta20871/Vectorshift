// debugNode.js

import { useState } from 'react';
import { Bug } from 'lucide-react';
import { BaseNode, NodeField, NodeInput } from './BaseNode';

export const DebugNode = ({ id, data }) => {
  const [debugText, setDebugText] = useState(data?.debugText || 'Console output here...');

  return (
    <BaseNode
      id={id}
      title="Debug Node"
      Icon={Bug}
      className="debug-node"
      inputs={[{ id: 'debugIn', label: 'Debug In' }]}
      outputs={[{ id: 'debugOut', label: 'Debug Out' }]}
    >
      <NodeField>
        <NodeInput
          value={debugText}
          onChange={(e) => setDebugText(e.target.value)}
          placeholder="Console output here..."
        />
      </NodeField>
    </BaseNode>
  );
};
