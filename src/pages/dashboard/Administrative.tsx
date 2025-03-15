import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface Submenu {
  id: string;
  title: string;
  links: Link[];
}

export default function Administrative() {
  const [submenus, setSubmenus] = useState<Submenu[]>([]);
  const [newSubmenuTitle, setNewSubmenuTitle] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [selectedSubmenuId, setSelectedSubmenuId] = useState<string | null>(null);

  const handleAddSubmenu = () => {
    if (newSubmenuTitle.trim()) {
      const newSubmenu: Submenu = {
        id: Date.now().toString(),
        title: newSubmenuTitle,
        links: []
      };
      setSubmenus([...submenus, newSubmenu]);
      setNewSubmenuTitle("");
    }
  };

  const handleAddLink = () => {
    if (selectedSubmenuId && newLinkTitle && newLinkUrl) {
      setSubmenus(submenus.map(submenu => {
        if (submenu.id === selectedSubmenuId) {
          return {
            ...submenu,
            links: [...submenu.links, {
              id: Date.now().toString(),
              title: newLinkTitle,
              url: newLinkUrl
            }]
          };
        }
        return submenu;
      }));
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-white">Gerenciar Links</h2>
        <p className="text-gray-400">Adicione e organize links para outros sistemas</p>
      </header>

      <Card className="p-4 bg-sidebar border-gray-800 max-w-md">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Nome do Menu</label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Sistemas Internos"
                value={newSubmenuTitle}
                onChange={(e) => setNewSubmenuTitle(e.target.value)}
                className="flex-1 bg-background text-white border-gray-800"
              />
              <Button 
                onClick={handleAddSubmenu}
                size="icon"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedSubmenuId && (
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Título do Link</label>
                <Input
                  placeholder="Ex: Sistema de RH"
                  value={newLinkTitle}
                  onChange={(e) => setNewLinkTitle(e.target.value)}
                  className="bg-background text-white border-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">URL</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://..."
                    type="url"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="flex-1 bg-background text-white border-gray-800"
                  />
                  <Button 
                    onClick={handleAddLink}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
