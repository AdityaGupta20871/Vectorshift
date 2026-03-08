// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      className="llm-node"
      inputs={[
        { id: 'system', color: '#f59e0b' },
        { id: 'prompt', color: '#6366f1' },
      ]}
      outputs={[{ id: 'response', color: '#22c55e' }]}
    >
      <div className="llm-info">
        <div className="llm-badge">GPT-4</div>
        <p className="llm-description">Large Language Model for text generation</p>
      </div>
    </BaseNode>
  );
}
