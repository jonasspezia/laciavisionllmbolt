-- Create checklist_templates table
CREATE TABLE IF NOT EXISTS checklist_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    procedure_type TEXT NOT NULL,
    version TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create checklist_items table
CREATE TABLE IF NOT EXISTS checklist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES checklist_templates(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    required BOOLEAN DEFAULT true,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('technical', 'safety', 'efficiency')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Policies for checklist_templates
CREATE POLICY "Users can view active templates"
    ON checklist_templates FOR SELECT
    USING (is_active = true);

CREATE POLICY "Users can manage their own templates"
    ON checklist_templates FOR ALL
    USING (auth.uid() = created_by);

-- Policies for checklist_items
CREATE POLICY "Users can view items of visible templates"
    ON checklist_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM checklist_templates ct
            WHERE ct.id = template_id
            AND ct.is_active = true
        )
    );

CREATE POLICY "Users can manage items of their templates"
    ON checklist_items FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM checklist_templates ct
            WHERE ct.id = template_id
            AND ct.created_by = auth.uid()
        )
    );

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_checklist_templates_procedure_type ON checklist_templates(procedure_type);
CREATE INDEX IF NOT EXISTS idx_checklist_items_template_id ON checklist_items(template_id);
CREATE INDEX IF NOT EXISTS idx_checklist_items_order ON checklist_items(template_id, order_index);

-- Update function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_checklist_templates_updated_at
    BEFORE UPDATE ON checklist_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at
    BEFORE UPDATE ON checklist_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample template
INSERT INTO checklist_templates (name, description, procedure_type, version, created_by)
VALUES (
    'Checklist Base - Procedimentos Gerais',
    'Template base para avaliação de procedimentos médicos gerais',
    'geral',
    '1.0.0',
    auth.uid()
);
