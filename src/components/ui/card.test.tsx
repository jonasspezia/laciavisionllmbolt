import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';

describe('Card Component', () => {
  // Teste básico de renderização
  it('renders card with content', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  // Teste de composição completa
  it('renders all card subcomponents correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Main Content</CardContent>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  // Teste de classes default
  it('applies default classes correctly', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass(
      'rounded-lg border bg-card text-card-foreground shadow-sm'
    );
  });

  // Teste de custom className
  it('accepts and applies custom className', () => {
    render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>
    );
    expect(screen.getByText('Content').parentElement).toHaveClass('custom-class');
  });

  // Testes individuais dos subcomponentes
  describe('CardHeader', () => {
    it('renders with correct default classes', () => {
      render(
        <CardHeader>
          <div>Header Content</div>
        </CardHeader>
      );
      expect(screen.getByText('Header Content').parentElement).toHaveClass(
        'flex flex-col space-y-1.5 p-6'
      );
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with correct classes', () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText('Card Title');
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
    });
  });

  describe('CardDescription', () => {
    it('renders with correct classes', () => {
      render(<CardDescription>Description Text</CardDescription>);
      expect(screen.getByText('Description Text')).toHaveClass(
        'text-sm text-muted-foreground'
      );
    });
  });

  describe('CardContent', () => {
    it('renders with correct padding classes', () => {
      render(<CardContent>Content Area</CardContent>);
      expect(screen.getByText('Content Area').parentElement).toHaveClass('p-6 pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with correct layout classes', () => {
      render(<CardFooter>Footer Area</CardFooter>);
      expect(screen.getByText('Footer Area').parentElement).toHaveClass(
        'flex items-center p-6 pt-0'
      );
    });
  });

  // Teste de acessibilidade
  it('meets accessibility requirements', () => {
    render(
      <Card aria-label="Test Card">
        <CardHeader>
          <CardTitle>Accessible Title</CardTitle>
          <CardDescription>Card description for screen readers</CardDescription>
        </CardHeader>
      </Card>
    );
    
    expect(screen.getByLabelText('Test Card')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Accessible Title');
  });

  // Teste de ref forwarding
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Card with ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
