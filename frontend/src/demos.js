// demos.js - Simple starter pipeline

import { MarkerType } from 'reactflow';

const edge = (id, source, sourceHandle, target, targetHandle) => ({
  id,
  source,
  sourceHandle,
  target,
  targetHandle,
  type: 'smoothstep',
  animated: true,
  markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
});

// Simple LLM pipeline: Input → Text (with variable) → LLM → Output
export const DEFAULT_DEMO = {
  nodes: [
    {
      id: 'customInput-1', type: 'customInput', position: { x: 100, y: 200 },
      data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'user_query', inputType: 'Text' },
    },
    {
      id: 'text-1', type: 'text', position: { x: 350, y: 180 },
      data: { id: 'text-1', nodeType: 'text', text: 'Answer this: {{user_query}}' },
    },
    {
      id: 'llm-1', type: 'llm', position: { x: 620, y: 200 },
      data: { id: 'llm-1', nodeType: 'llm' },
    },
    {
      id: 'customOutput-1', type: 'customOutput', position: { x: 880, y: 200 },
      data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'response', outputType: 'Text' },
    },
  ],
  edges: [
    edge('e1', 'customInput-1', 'customInput-1-value', 'text-1', 'text-1-user_query'),
    edge('e2', 'text-1', 'text-1-output', 'llm-1', 'llm-1-prompt'),
    edge('e3', 'llm-1', 'llm-1-response', 'customOutput-1', 'customOutput-1-value'),
  ],
};
