import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { handler } from './index.ts';

const mockFormData = {
  get: vi.fn(),
};

const mockFetch = vi.fn();
global.fetch = mockFetch;
global.FormData = vi.fn(() => mockFormData) as any;

const mockSupabaseClient = {
  from: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({ data: { id: 'test-id' }, error: null })),
      })),
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({ data: null, error: null })),
    })),
  })),
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

describe('analyze-video edge function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.log = vi.fn(); // Mock console.log para testar logs
    console.error = vi.fn(); // Mock console.error para testar logs de erro
    
    // Mock dos dados do form
    mockFormData.get.mockImplementation((key: string) => {
      switch (key) {
        case 'video':
          return new File(['test'], 'test.mp4', { type: 'video/mp4' });
        case 'checklist':
          return JSON.stringify(['item1', 'item2']);
        case 'userId':
          return 'test-user-id';
        case 'studentId':
          return 'test-student-id';
        case 'evaluationPrompt':
          return JSON.stringify({
            title: 'Test Prompt',
            context_template: 'Test context',
            objectives: ['obj1'],
            language_guidelines: 'Test guidelines',
            response_structure: ['step1'],
            reflection_questions: ['q1'],
          });
        default:
          return null;
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should handle video upload and analysis successfully', async () => {
    // Mock successful file upload response
    mockFetch
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ uri: 'test-file-uri' }),
      }))
      // Mock successful file status check
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ state: 'ACTIVE' }),
      }))
      // Mock successful analysis response
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'Test analysis result' }],
            },
          }],
        }),
      }))
      // Mock successful file deletion
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
      }));

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toHaveProperty('analysisId');
    expect(responseData).toHaveProperty('result');
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('video_analyses');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Processo de análise concluído com sucesso'));
  });

  it('should handle missing required fields', async () => {
    mockFormData.get.mockImplementation(() => null);

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing required fields');
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Campos obrigatórios faltando'));
  });

  it('should handle file upload errors', async () => {
    mockFetch.mockImplementationOnce(() => Promise.resolve({
      ok: false,
      text: () => Promise.resolve('Upload failed'),
    }));

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(500);
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toContain('Failed to upload video');
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Erro no upload do vídeo'));
  });

  it('should handle invalid file type', async () => {
    mockFormData.get.mockImplementation((key: string) => {
      if (key === 'video') {
        return new File(['test'], 'test.txt', { type: 'text/plain' });
      }
      return mockFormData.get.getMockImplementation()(key);
    });

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toContain('Invalid file type');
  });

  it('should handle Gemini API errors', async () => {
    // Mock successful file upload and status check
    mockFetch
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ uri: 'test-file-uri' }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ state: 'ACTIVE' }),
      }))
      // Mock failed Gemini API call
      .mockImplementationOnce(() => Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Gemini API error'),
      }));

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(500);
    expect(responseData).toHaveProperty('error');
    expect(responseData.error).toContain('Failed to analyze video');
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Erro na análise Gemini'));
  });

  it('should handle database errors', async () => {
    // Mock database error
    mockSupabaseClient.from.mockImplementationOnce(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({ data: null, error: new Error('Database error') })),
        })),
      })),
    }));

    // Mock successful file operations
    mockFetch
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ uri: 'test-file-uri' }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ state: 'ACTIVE' }),
      }));

    const req = new Request('http://localhost/analyze-video', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await handler(req);
    const responseData = await response.json();

    expect(response.status).toBe(500);
    expect(responseData).toHaveProperty('error');
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Erro ao criar registro'));
  });
});
