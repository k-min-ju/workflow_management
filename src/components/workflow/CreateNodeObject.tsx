import React, { DragEvent } from 'react';
import { DATA_TRANSFER_TYPE } from '@/configs/constants';
import { CreateNodeObjectProps, FLOW_OBJECT_COLOR_KEY } from '@/components/workflow/xyflowTypes';

/**
 * Workflow node object creation common components
 * @param className - The class name applied to the node object
 * @param muiIcon - mui icon component to represent a node object
 * @param labelText - title representing the node object
 * @param nodeType
 * @constructor
 */
export default function CreateNodeObject({
  className,
  muiIcon,
  labelText,
  nodeType
}: CreateNodeObjectProps): React.JSX.Element {
  const onDragStart = (event: DragEvent, nodeType: FLOW_OBJECT_COLOR_KEY): void => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(DATA_TRANSFER_TYPE, nodeType);
  };
  return (
    <div className={className} draggable onDragStart={(event: DragEvent): void => onDragStart(event, nodeType)}>
      {muiIcon}
      <div className="label">{labelText}</div>
    </div>
  );
}
