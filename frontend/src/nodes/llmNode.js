// llmNode.js

import { MessageSquare } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM Node"
      Icon={MessageSquare}
      className="llm-node"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div className="llm-info">
        <p className="llm-description">Large Language Model</p>
      </div>
    </BaseNode>
  );
}
