// demos.js - Pre-built demo pipelines

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

export const DEMOS = [
  {
    id: 'llm-pipeline',
    label: '🤖 LLM Chat Pipeline',
    description: 'Classic Input → Text prompt → LLM → Output pipeline',
    nodes: [
      {
        id: 'customInput-1', type: 'customInput', position: { x: 60, y: 200 },
        data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'user_question', inputType: 'Text' },
      },
      {
        id: 'text-1', type: 'text', position: { x: 280, y: 120 },
        data: { id: 'text-1', nodeType: 'text', text: 'You are a helpful assistant.\nAnswer this question: {{user_question}}' },
      },
      {
        id: 'text-2', type: 'text', position: { x: 280, y: 300 },
        data: { id: 'text-2', nodeType: 'text', text: 'Be concise and professional.' },
      },
      {
        id: 'llm-1', type: 'llm', position: { x: 560, y: 200 },
        data: { id: 'llm-1', nodeType: 'llm' },
      },
      {
        id: 'customOutput-1', type: 'customOutput', position: { x: 800, y: 200 },
        data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'ai_response', outputType: 'Text' },
      },
    ],
    edges: [
      edge('e1', 'customInput-1', 'customInput-1-value', 'text-1', 'text-1-user_question'),
      edge('e2', 'text-1', 'text-1-output', 'llm-1', 'llm-1-prompt'),
      edge('e3', 'text-2', 'text-2-output', 'llm-1', 'llm-1-system'),
      edge('e4', 'llm-1', 'llm-1-response', 'customOutput-1', 'customOutput-1-value'),
    ],
  },
  {
    id: 'math-pipeline',
    label: '🔢 Math Processor',
    description: 'Two inputs → Math operations → condition check → Output',
    nodes: [
      {
        id: 'customInput-1', type: 'customInput', position: { x: 60, y: 140 },
        data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'value_a', inputType: 'Text' },
      },
      {
        id: 'customInput-2', type: 'customInput', position: { x: 60, y: 300 },
        data: { id: 'customInput-2', nodeType: 'customInput', inputName: 'value_b', inputType: 'Text' },
      },
      {
        id: 'math-1', type: 'math', position: { x: 310, y: 200 },
        data: { id: 'math-1', nodeType: 'math', operation: 'add' },
      },
      {
        id: 'condition-1', type: 'condition', position: { x: 560, y: 200 },
        data: { id: 'condition-1', nodeType: 'condition', conditionType: 'greater_than' },
      },
      {
        id: 'customOutput-1', type: 'customOutput', position: { x: 820, y: 140 },
        data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'result_true', outputType: 'Text' },
      },
      {
        id: 'customOutput-2', type: 'customOutput', position: { x: 820, y: 300 },
        data: { id: 'customOutput-2', nodeType: 'customOutput', outputName: 'result_false', outputType: 'Text' },
      },
    ],
    edges: [
      edge('e1', 'customInput-1', 'customInput-1-value', 'math-1', 'math-1-a'),
      edge('e2', 'customInput-2', 'customInput-2-value', 'math-1', 'math-1-b'),
      edge('e3', 'math-1', 'math-1-result', 'condition-1', 'condition-1-input'),
      edge('e4', 'condition-1', 'condition-1-true', 'customOutput-1', 'customOutput-1-value'),
      edge('e5', 'condition-1', 'condition-1-false', 'customOutput-2', 'customOutput-2-value'),
    ],
  },
  {
    id: 'api-pipeline',
    label: '🌐 API Data Pipeline',
    description: 'Fetch data from API → Filter → Format text → Output',
    nodes: [
      {
        id: 'customInput-1', type: 'customInput', position: { x: 60, y: 220 },
        data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'search_query', inputType: 'Text' },
      },
      {
        id: 'api-1', type: 'api', position: { x: 290, y: 220 },
        data: { id: 'api-1', nodeType: 'api', url: 'https://api.example.com/search', method: 'GET' },
      },
      {
        id: 'filter-1', type: 'filter', position: { x: 530, y: 140 },
        data: { id: 'filter-1', nodeType: 'filter', filterKey: 'results', filterValue: 'active' },
      },
      {
        id: 'text-1', type: 'text', position: { x: 530, y: 320 },
        data: { id: 'text-1', nodeType: 'text', text: 'Results for: {{search_query}}' },
      },
      {
        id: 'customOutput-1', type: 'customOutput', position: { x: 790, y: 220 },
        data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'filtered_results', outputType: 'Text' },
      },
      {
        id: 'note-1', type: 'note', position: { x: 60, y: 380 },
        data: { id: 'note-1', nodeType: 'note', note: '📝 This pipeline fetches data\nfrom an external API, filters\nthe results, and formats output.', color: '#bfdbfe' },
      },
    ],
    edges: [
      edge('e1', 'customInput-1', 'customInput-1-value', 'api-1', 'api-1-url'),
      edge('e2', 'customInput-1', 'customInput-1-value', 'text-1', 'text-1-search_query'),
      edge('e3', 'api-1', 'api-1-response', 'filter-1', 'filter-1-input'),
      edge('e4', 'filter-1', 'filter-1-output', 'customOutput-1', 'customOutput-1-value'),
    ],
  },
  {
    id: 'complex-pipeline',
    label: '⚡ Full Complex Pipeline',
    description: 'All node types — the ultimate demo for the assignment',
    nodes: [
      {
        id: 'customInput-1', type: 'customInput', position: { x: 40, y: 80 },
        data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'user_name', inputType: 'Text' },
      },
      {
        id: 'customInput-2', type: 'customInput', position: { x: 40, y: 240 },
        data: { id: 'customInput-2', nodeType: 'customInput', inputName: 'user_topic', inputType: 'Text' },
      },
      {
        id: 'text-1', type: 'text', position: { x: 280, y: 60 },
        data: { id: 'text-1', nodeType: 'text', text: 'Hello {{user_name}}! Let\'s explore {{user_topic}}.' },
      },
      {
        id: 'text-2', type: 'text', position: { x: 280, y: 260 },
        data: { id: 'text-2', nodeType: 'text', text: 'Topic context: {{user_topic}}' },
      },
      {
        id: 'llm-1', type: 'llm', position: { x: 540, y: 140 },
        data: { id: 'llm-1', nodeType: 'llm' },
      },
      {
        id: 'api-1', type: 'api', position: { x: 280, y: 420 },
        data: { id: 'api-1', nodeType: 'api', url: 'https://api.example.com/data', method: 'GET' },
      },
      {
        id: 'filter-1', type: 'filter', position: { x: 540, y: 400 },
        data: { id: 'filter-1', nodeType: 'filter', filterKey: 'status', filterValue: 'active' },
      },
      {
        id: 'condition-1', type: 'condition', position: { x: 780, y: 280 },
        data: { id: 'condition-1', nodeType: 'condition', conditionType: 'contains' },
      },
      {
        id: 'customOutput-1', type: 'customOutput', position: { x: 1020, y: 160 },
        data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'ai_response', outputType: 'Text' },
      },
      {
        id: 'customOutput-2', type: 'customOutput', position: { x: 1020, y: 360 },
        data: { id: 'customOutput-2', nodeType: 'customOutput', outputName: 'data_output', outputType: 'Text' },
      },
      {
        id: 'note-1', type: 'note', position: { x: 40, y: 430 },
        data: { id: 'note-1', nodeType: 'note', note: '🚀 Assignment Demo\nShows: BaseNode abstraction,\nText variables, DAG validation,\nBackend integration!', color: '#bbf7d0' },
      },
    ],
    edges: [
      edge('e1', 'customInput-1', 'customInput-1-value', 'text-1', 'text-1-user_name'),
      edge('e2', 'customInput-2', 'customInput-2-value', 'text-1', 'text-1-user_topic'),
      edge('e3', 'customInput-2', 'customInput-2-value', 'text-2', 'text-2-user_topic'),
      edge('e4', 'text-1', 'text-1-output', 'llm-1', 'llm-1-prompt'),
      edge('e5', 'text-2', 'text-2-output', 'llm-1', 'llm-1-system'),
      edge('e6', 'customInput-2', 'customInput-2-value', 'api-1', 'api-1-url'),
      edge('e7', 'api-1', 'api-1-response', 'filter-1', 'filter-1-input'),
      edge('e8', 'llm-1', 'llm-1-response', 'condition-1', 'condition-1-input'),
      edge('e9', 'filter-1', 'filter-1-output', 'condition-1', 'condition-1-value'),
      edge('e10', 'condition-1', 'condition-1-true', 'customOutput-1', 'customOutput-1-value'),
      edge('e11', 'condition-1', 'condition-1-false', 'customOutput-2', 'customOutput-2-value'),
    ],
  },
];

export const DEFAULT_DEMO = DEMOS[3]; // Full Complex Pipeline loads by default
