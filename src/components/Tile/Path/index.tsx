import React , {useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';

import { character,deadEnd,straight,leftCorner,oneWay,rightCorner,tWay ,playerFront ,defaultTile } from '../../../assets/playground';

const Tile =(props) =>{
  const imgData = [{id:'character',src:character},{id:'deadend',src:deadEnd},{id:'straight',src:straight},{id:'leftCorner',src:leftCorner},{id:'oneway',src:oneWay},{id:'rightCorner',src:rightCorner},{id:'tway',src:tWay},{id:'player',src:playerFront},{id:'defaulttile',src:defaultTile}]
  const {attributes, listeners, setNodeRef, transform , isDragging} = useDraggable({
    id: props.id,
    data:
    {
      content: props.content,
      boardId: props.boardId,
      type: props.type,
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined; 

  useEffect(() => {
    props.setFocusTile(isDragging)
  }, [isDragging])

  const direction = [{ id: 'up', rotate: 'rotate-0',},{ id: 'right', rotate: 'rotate-90',},{ id: 'down', rotate: 'rotate-180',},{ id: 'left', rotate: 'rotate-[-90deg]',},]

  const element = direction.find((item)=>item.id === props.content)?.rotate

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className='w-[4.5rem] h-[4.5rem] z-[50]'>
      <img src={imgData.find((item)=>item.id === props.type)?.src} alt={props.type} className={`w-full h-full ${element}`}/>
    </button>
    
  );
}

export default Tile