// submit.js

import { useState, useEffect, useRef } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { X, GitBranch, Link2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

// Use environment variable for API URL, fallback to localhost for development
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');

// Check if pipeline is valid (all nodes connected)
const isPipelineValid = (nodes, edges) => {
    if (nodes.length === 0) return true;
    if (nodes.length === 1) return true;
    
    // Check if there are disconnected nodes
    const connectedNodes = new Set();
    edges.forEach(edge => {
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
    });
    
    // If we have edges, check if all nodes are connected
    if (edges.length > 0) {
        return nodes.every(node => connectedNodes.has(node.id));
    }
    
    // No edges but multiple nodes = invalid
    return nodes.length <= 1;
};

// Alert Modal Component
const AlertModal = ({ data, onClose }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        if (data && data.is_dag && data.is_pipeline_valid) {
            // Fire confetti on success
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [data]);

    if (!data) return null;

    const isFullyValid = data.is_dag && data.is_pipeline_valid;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
                
                <h2 className="modal-title">Pipeline Validation Results</h2>
                
                <div className="modal-stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-label">Nodes</span>
                            <GitBranch size={18} className="stat-icon" />
                        </div>
                        <span className="stat-value">{data.num_nodes}</span>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-label">Edges</span>
                            <Link2 size={18} className="stat-icon" />
                        </div>
                        <span className="stat-value">{data.num_edges}</span>
                    </div>
                </div>

                <div className="validation-results">
                    <div className={`validation-item ${data.is_dag ? 'valid' : 'invalid'}`}>
                        {data.is_dag ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        <span>DAG Structure</span>
                        <span className={`validation-badge ${data.is_dag ? 'valid' : 'invalid'}`}>
                            {data.is_dag ? 'Valid' : 'Invalid'}
                        </span>
                    </div>
                    <div className={`validation-item ${data.is_pipeline_valid ? 'valid' : 'invalid'}`}>
                        {data.is_pipeline_valid ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        <span>Pipeline</span>
                        <span className={`validation-badge ${data.is_pipeline_valid ? 'valid' : 'invalid'}`}>
                            {data.is_pipeline_valid ? 'Valid' : 'Invalid'}
                        </span>
                    </div>
                </div>

                {!isFullyValid && (
                    <div className="validation-warning">
                        <AlertCircle size={18} />
                        <span>
                            {!data.is_dag 
                                ? 'Cycle detected in pipeline' 
                                : 'Invalid pipeline: disconnected nodes detected'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Add pipeline validity check
            data.is_pipeline_valid = isPipelineValid(nodes, edges);
            setAlertData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error connecting to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal data={alertData} onClose={() => setAlertData(null)} />
        </>
    );
}

// Export run button handler for toolbar
export const useSubmitPipeline = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            data.is_pipeline_valid = isPipelineValid(nodes, edges);
            setAlertData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error connecting to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading, alertData, setAlertData, AlertModal };
}
