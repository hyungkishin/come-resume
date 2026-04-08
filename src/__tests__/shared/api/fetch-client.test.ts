import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/shared/api/fetch-client';

describe('fetch-client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('GET 요청 성공', async () => {
    const mockData = { id: 1, name: 'test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await api.get('/api/test');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('POST 요청 body 전달', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await api.post('/api/test', { foo: 'bar' });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ foo: 'bar' }),
      })
    );
  });

  it('에러 응답 시 throw', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(api.get('/api/missing')).rejects.toThrow('API Error: 404 Not Found');
  });

  it('PATCH 요청', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ updated: true }),
    });

    await api.patch('/api/test/1', { name: 'updated' });
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'PATCH' })
    );
  });

  it('DELETE 요청', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ deleted: true }),
    });

    await api.delete('/api/test/1');
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('쿼리 파라미터 추가', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await api.get('/api/repos', { params: { sort: 'stars', limit: '10' } });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('sort=stars'),
      expect.any(Object)
    );
  });
});
