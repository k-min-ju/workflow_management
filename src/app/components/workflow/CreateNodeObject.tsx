import React from 'react';
import { CreateNodeObjectProps } from '@/types/xyflow';

/**
 * Workflow node object creation common components
 * @param className - The class name applied to the node object
 * @param muiIcon - mui icon component to represent a node object
 * @param labelText - title representing the node object
 * @constructor
 */
export default function CreateNodeObject({ className, muiIcon, labelText }: CreateNodeObjectProps): React.JSX.Element {
  return (
    <div className={className} draggable="true">
      {muiIcon}
      <div className="label">{labelText}</div>
    </div>
  );
}
