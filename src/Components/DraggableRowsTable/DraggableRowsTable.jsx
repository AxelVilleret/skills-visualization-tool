import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import "./style.css";

const DraggableRowsTable = ({ name, elements, setElements }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newTabOrder = Array.from(elements);

    // Remove the dragged tab from its original position and insert it into its new position
    const [draggedTab] = newTabOrder.splice(sourceIndex, 1);
    newTabOrder.splice(destinationIndex, 0, draggedTab);

    // Store in local storage
    localStorage.setItem(name, JSON.stringify(newTabOrder));

    // Update the state with the new tab order
    setElements(newTabOrder);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table table-trim table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nom de l'onglet</th>
            </tr>
          </thead>
          <Droppable droppableId="tabs">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((tab, index) => (
                  <Draggable key={index} draggableId={`tab-${index}`} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td className="w-50">
                          <DragIndicatorIcon />
                        </td>
                        <td>{tab}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </>
  );
};

export default DraggableRowsTable;
