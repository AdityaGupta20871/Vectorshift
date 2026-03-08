// imageNode.js - Image/Media Node (Extra Feature)

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput } from './BaseNode';

export const ImageNode = ({ id, data }) => {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');
  const [altText, setAltText] = useState(data?.altText || '');

  return (
    <BaseNode
      id={id}
      title="Image"
      icon="🖼️"
      className="image-node"
      inputs={[{ id: 'url', color: '#6366f1' }]}
      outputs={[{ id: 'image', color: '#22c55e' }]}
    >
      <NodeField label="Image URL">
        <NodeInput 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          placeholder="https://example.com/image.jpg"
        />
      </NodeField>
      <NodeField label="Alt Text">
        <NodeInput 
          value={altText} 
          onChange={(e) => setAltText(e.target.value)} 
          placeholder="Image description"
        />
      </NodeField>
      {imageUrl && (
        <div className="image-preview">
          <img 
            src={imageUrl} 
            alt={altText || 'Preview'} 
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
    </BaseNode>
  );
};
