// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

// Alert Modal Component
const AlertModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-icon">📊</span>
                    <h2 className="modal-title">Pipeline Analysis</h2>
                </div>
                <div className="modal-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total Nodes</span>
                        <span className="stat-value">{data.num_nodes}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Edges</span>
                        <span className="stat-value">{data.num_edges}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Is Valid DAG?</span>
                        <span className={`stat-value ${data.is_dag ? 'success' : 'error'}`}>
                            {data.is_dag ? '✓ Yes' : '✗ No'}
                        </span>
                    </div>
                </div>
                <button className="modal-close" onClick={onClose}>
                    Close
                </button>
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
            const response = await fetch('http://localhost:8000/pipelines/parse', {
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
            <div className="submit-container">
                <button 
                    className="submit-button"
                    type="button" 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>
            <AlertModal data={alertData} onClose={() => setAlertData(null)} />
        </>
    );
}
