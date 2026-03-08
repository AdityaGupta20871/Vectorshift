// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useSubmitPipeline } from './submit';
import { 
    ArrowRightFromLine, 
    MessageSquare, 
    ArrowRightToLine, 
    FileText, 
    Layers, 
    Bug, 
    Filter, 
    Globe, 
    Sparkles,
    Play
} from 'lucide-react';

const selector = (state) => ({
    animatedEdges: state.animatedEdges,
    deletableEdges: state.deletableEdges,
    setAnimatedEdges: state.setAnimatedEdges,
    setDeletableEdges: state.setDeletableEdges,
});

export const PipelineToolbar = () => {
    const { animatedEdges, deletableEdges, setAnimatedEdges, setDeletableEdges } = useStore(selector, shallow);
    const { handleSubmit, loading, alertData, setAlertData, AlertModal } = useSubmitPipeline();

    return (
        <>
        <div className="pipeline-toolbar">
            <div className="toolbar-logo">
                <span className="logo-text">VS</span>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' Icon={ArrowRightFromLine} />
                <DraggableNode type='llm' label='LLM' Icon={MessageSquare} />
                <DraggableNode type='customOutput' label='Output' Icon={ArrowRightToLine} />
                <DraggableNode type='text' label='Text' Icon={FileText} />
                <DraggableNode type='aggregate' label='Aggregate' Icon={Layers} />
                <DraggableNode type='debug' label='Debug' Icon={Bug} />
                <DraggableNode type='filter' label='Filter' Icon={Filter} />
                <DraggableNode type='api' label='Http' Icon={Globe} />
                <DraggableNode type='transform' label='Transform' Icon={Sparkles} />
            </div>
            <div className="toolbar-controls">
                <div className="toggle-group">
                    <label className="toggle-label">
                        <span>Deletable Edges</span>
                        <div className={`toggle-switch ${deletableEdges ? 'active' : ''}`} onClick={() => setDeletableEdges(!deletableEdges)}>
                            <div className="toggle-knob"></div>
                        </div>
                    </label>
                </div>
                <div className="toggle-group">
                    <label className="toggle-label">
                        <span>Animated Edges</span>
                        <div className={`toggle-switch ${animatedEdges ? 'active' : ''}`} onClick={() => setAnimatedEdges(!animatedEdges)}>
                            <div className="toggle-knob"></div>
                        </div>
                    </label>
                </div>
                <button className="run-button" onClick={handleSubmit} disabled={loading}>
                    <Play size={20} fill="white" />
                </button>
            </div>
        </div>
        <AlertModal data={alertData} onClose={() => setAlertData(null)} />
        </>
    );
};
