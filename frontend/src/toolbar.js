// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-title">Pipeline Builder</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='math' label='Math' icon='🔢' />
                <DraggableNode type='condition' label='Condition' icon='🔀' />
                <DraggableNode type='timer' label='Timer' icon='⏱️' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='note' label='Note' icon='📌' />
                <DraggableNode type='image' label='Image' icon='🖼️' />
            </div>
        </div>
    );
};
