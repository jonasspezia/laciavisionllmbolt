import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { ChecklistItem } from "@/types/checklist";
import { AddItemForm } from "./AddItemForm";
import { ChecklistItemFormData } from "./checklistItemSchema";
import { useChecklistItems } from "@/hooks/useChecklistItems";
import { Loading } from "@/components/ui/loading";
import { useEffect } from "react";

interface ChecklistItemsManagerProps {
  templateId: string;
}

export const ChecklistItemsManager = ({
  templateId,
}: ChecklistItemsManagerProps) => {
  const { items, loading, addItem, updateItemsOrder, deleteItem, loadItems } = useChecklistItems(templateId);

  useEffect(() => {
    loadItems();
  }, [templateId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    await updateItemsOrder(reorderedItems);
  };

  const handleAddItem = async (data: ChecklistItemFormData) => {
    await addItem(data);
  };

  const handleDeleteItem = async (itemId: string) => {
    await deleteItem(itemId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loading size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Item</CardTitle>
        </CardHeader>
        <CardContent>
          <AddItemForm templateId={templateId} onAdd={handleAddItem} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Itens do Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-card border rounded-lg p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <p>{item.description}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>
                                  {item.required ? "Obrigatório" : "Opcional"}
                                </span>
                                <span>•</span>
                                <span>Peso: {item.weight}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
};
