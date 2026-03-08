// toolbar.js

import { DraggableNode } from './draggableNode';
import { ThemeToggle } from './themeToggle';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-title">Pipeline Builder</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='text' label='Text' icon='📝' />
            </div>
            <ThemeToggle />
        </div>
    );
};
