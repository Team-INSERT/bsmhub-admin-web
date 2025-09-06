import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '@/utils/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { MutationOperation } from '../data/schema'

const handleUserMutation = async (operations: MutationOperation[]) => {
  for (const op of operations) {
    let query = supabase.from(op.tableName)
    let error

    switch (op.action) {
      case 'add':
        ;({ error } = await query.insert(op.data))
        break
      case 'update':
        if (!op.matchColumns) {
          throw new Error('Update operation must have matchColumns')
        }
        ;({ error } = await query.update(op.data).match(op.matchColumns))
        break
      case 'delete':
        if (!op.matchColumns) {
          throw new Error('Delete operation must have matchColumns')
        }
        ;({ error } = await query
          .update({ deleted_at: new Date().toISOString() })
          .match(op.matchColumns))
        break
      default:
        throw new Error(`Unsupported action: ${op.action}`)
    }

    if (error) {
      throw new Error(error.message)
    }
  }
}

export const useHandleUserMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: handleUserMutation,
    onSuccess: () => {
      // Invalidate all queries to refetch data
      queryClient.invalidateQueries()
      toast({
        title: '성공',
        description: '데이터가 성공적으로 처리되었습니다.',
      })
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: '오류',
        description: error.message || '데이터 처리 중 오류가 발생했습니다.',
      })
    },
  })
}
