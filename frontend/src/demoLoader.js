// demoLoader.js - Demo pipeline selector component

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { DEMOS } from './demos';

const selector = (state) => ({
  loadDemo: state.loadDemo,
  clearCanvas: state.clearCanvas,
});

export const DemoLoader = () => {
  const { loadDemo, clearCanvas } = useStore(selector, shallow);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(DEMOS[3].id);

  const handleLoad = (demo) => {
    loadDemo(demo);
    setActiveDemo(demo.id);
    setIsOpen(false);
  };

  const handleClear = () => {
    clearCanvas();
    setActiveDemo(null);
    setIsOpen(false);
  };

  const currentDemo = DEMOS.find(d => d.id === activeDemo);

  return (
    <div className="demo-loader">
      <button
        className="demo-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Load a demo pipeline"
      >
        <span>⚡</span>
        <span>Load Demo</span>
        <span className={`demo-chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="demo-dropdown">
          <div className="demo-dropdown-header">Demo Pipelines</div>
          {DEMOS.map((demo) => (
            <div
              key={demo.id}
              className={`demo-option ${activeDemo === demo.id ? 'active' : ''}`}
              onClick={() => handleLoad(demo)}
            >
              <div className="demo-option-label">{demo.label}</div>
              <div className="demo-option-desc">{demo.description}</div>
            </div>
          ))}
          <div className="demo-divider" />
          <div className="demo-option demo-clear" onClick={handleClear}>
            <div className="demo-option-label">🗑️ Clear Canvas</div>
            <div className="demo-option-desc">Remove all nodes and edges</div>
          </div>
        </div>
      )}

      {currentDemo && (
        <div className="demo-badge">
          {currentDemo.label}
        </div>
      )}
    </div>
  );
};
