import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import "./style.css";

const DraggableRowsTable = ({ tabsOrder, onTabsOrderChange }) => {

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const newTabOrder = Array.from(tabsOrder);
    const [draggedTab] = newTabOrder.splice(sourceIndex, 1);
    newTabOrder.splice(destinationIndex, 0, draggedTab);
    onTabsOrderChange(newTabOrder);
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
                {tabsOrder.map((tab, index) => (
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
