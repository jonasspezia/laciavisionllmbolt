import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';

// Schema de validação
const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Formato de email inválido')
});

type FormData = z.infer<typeof formSchema>;

// Componente de teste
const TestForm = ({ onSubmit = vi.fn() }: { onSubmit?: (data: FormData) => void }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <button type="submit">Enviar</button>
      </form>
    </Form>
  );
};

describe('Form Component', () => {
  // Teste de renderização básica
  it('renders form fields correctly', () => {
    render(<TestForm />);
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  // Teste de validação - campos vazios
  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    
    await user.click(screen.getByText('Enviar'));
    
    await waitFor(() => {
      expect(screen.getByText('Nome deve ter pelo menos 2 caracteres')).toBeInTheDocument();
      expect(screen.getByText('Formato de email inválido')).toBeInTheDocument();
    });
  });

  // Teste de validação - email inválido
  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    
    await user.type(screen.getByLabelText('Nome'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'invalid-email');
    await user.click(screen.getByText('Enviar'));
    
    await waitFor(() => {
      expect(screen.getByText('Formato de email inválido')).toBeInTheDocument();
    });
  });

  // Teste de submissão bem-sucedida
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText('Nome'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByText('Enviar'));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      }, expect.anything());
    });
  });

  // Teste de atributos de acessibilidade
  it('maintains correct accessibility attributes', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    
    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('Email');

    // Verifica atributos iniciais
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');

    // Submete o form vazio para triggar erros
    await user.click(screen.getByText('Enviar'));

    // Verifica se os atributos são atualizados após a validação
    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // Teste de limpeza de erros
  it('clears validation errors when input becomes valid', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    
    // Submete form vazio para triggar erros
    await user.click(screen.getByText('Enviar'));
    
    await waitFor(() => {
      expect(screen.getByText('Nome deve ter pelo menos 2 caracteres')).toBeInTheDocument();
    });

    // Corrige o input
    await user.type(screen.getByLabelText('Nome'), 'John Doe');
    
    // Verifica se a mensagem de erro sumiu
    await waitFor(() => {
      expect(screen.queryByText('Nome deve ter pelo menos 2 caracteres')).not.toBeInTheDocument();
    });
  });

  // Teste de integração com FormControl
  it('properly handles FormControl state changes', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    
    const nameInput = screen.getByLabelText('Nome');
    
    // Verifica classe inicial
    expect(nameInput.closest('div')).toHaveClass('flex');
    
    // Foca o input
    await user.click(nameInput);
    
    // Digita valor inválido e submete
    await user.type(nameInput, 'a');
    await user.click(screen.getByText('Enviar'));
    
    // Verifica se o estado de erro é refletido visualmente
    await waitFor(() => {
      expect(screen.getByText('Nome deve ter pelo menos 2 caracteres')).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
