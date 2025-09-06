import { describe, it, expect, vi, beforeEach } from 'vitest'
import { handleUserMutation } from '../../../../features/users/services/handleUserMutation'
import { MutationOperation } from '../../../../features/users/data/schema'
import supabase from '@/utils/supabase/client'

vi.mock('@/utils/supabase/client', () => ({
  default: {
    from: vi.fn(),
  },
}))

describe('handleUserMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle "add" action', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null })
    vi.mocked(supabase.from).mockReturnValue({ insert: insertMock } as any)

    const operations: MutationOperation[] = [
      {
        tableName: 'test_table',
        action: 'add',
        data: { name: 'test' },
      },
    ]

    await handleUserMutation(operations)

    expect(supabase.from).toHaveBeenCalledWith('test_table')
    expect(insertMock).toHaveBeenCalledWith({ name: 'test' })
  })

  it('should handle "update" action', async () => {
    const updateMatchMock = vi.fn().mockResolvedValue({ error: null })
    const updateMock = vi.fn().mockReturnValue({ match: updateMatchMock })
    vi.mocked(supabase.from).mockReturnValue({ update: updateMock } as any)

    const operations: MutationOperation[] = [
      {
        tableName: 'test_table',
        action: 'update',
        data: { name: 'updated' },
        matchColumns: { id: 1 },
      },
    ]

    await handleUserMutation(operations)

    expect(supabase.from).toHaveBeenCalledWith('test_table')
    expect(updateMock).toHaveBeenCalledWith({ name: 'updated' })
    expect(updateMatchMock).toHaveBeenCalledWith({ id: 1 })
  })

  it('should handle "delete" action', async () => {
    const updateMatchMock = vi.fn().mockResolvedValue({ error: null })
    const updateMock = vi.fn().mockReturnValue({ match: updateMatchMock })
    vi.mocked(supabase.from).mockReturnValue({ update: updateMock } as any)

    const operations: MutationOperation[] = [
      {
        tableName: 'test_table',
        action: 'delete',
        data: {},
        matchColumns: { id: 1 },
      },
    ]

    await handleUserMutation(operations)

    expect(supabase.from).toHaveBeenCalledWith('test_table')
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        deleted_at: expect.any(String),
      })
    )
    expect(updateMatchMock).toHaveBeenCalledWith({ id: 1 })
  })

  it('should throw an error for unsupported action', async () => {
    const operations: MutationOperation[] = [
      {
        tableName: 'test_table',
        action: 'unsupported' as any,
        data: {},
      },
    ]

    await expect(handleUserMutation(operations)).rejects.toThrow(
      'Unsupported action: unsupported'
    )
  })
})
