import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './dialog';

describe('Dialog Component', () => {
  // Helper function para renderizar o Dialog
  const renderDialog = ({
    defaultOpen,
    onOpenChange,
  }: {
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {}) => {
    return render(
      <Dialog defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
          <div className="py-4">Dialog content</div>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Teste básico de renderização
  it('renders dialog trigger', () => {
    renderDialog();
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  // Teste de abertura do dialog
  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('Dialog description')).toBeInTheDocument();
    });
  });

  // Teste de fechamento do dialog
  it('closes dialog when clicking outside', async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Clique fora do dialog (no overlay)
    const dialog = screen.getByRole('dialog').parentElement;
    if (dialog?.parentElement) {
      await user.click(dialog.parentElement);
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // Teste de callback onOpenChange
  it('calls onOpenChange when dialog state changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    await user.click(screen.getByText('Open Dialog'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Aguarda o dialog abrir
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Pressiona ESC para fechar
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // Teste de navegação por teclado
  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    renderDialog();

    // Abre o dialog
    await user.click(screen.getByText('Open Dialog'));
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Verifica se o foco está dentro do dialog
    expect(document.activeElement?.closest('[role="dialog"]')).toBeInTheDocument();

    // Fecha com ESC
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // Teste de acessibilidade
  it('meets accessibility requirements', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });
  });

  // Teste de animação
  it('applies correct animation classes', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      const dialogContent = screen.getByRole('dialog');
      expect(dialogContent).toHaveClass('data-[state=open]:animate-in');
    });
  });

  // Teste de composição de componentes
  it('renders all dialog subcomponents correctly', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open Complex Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complex Dialog</DialogTitle>
            <DialogDescription>With all subcomponents</DialogDescription>
          </DialogHeader>
          <div>Content Section</div>
          <DialogFooter>
            <button>Action Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText('Open Complex Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Complex Dialog')).toBeInTheDocument();
      expect(screen.getByText('With all subcomponents')).toBeInTheDocument();
      expect(screen.getByText('Content Section')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
  });
});
