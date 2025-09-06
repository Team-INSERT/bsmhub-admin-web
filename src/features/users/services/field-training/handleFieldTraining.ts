import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '@/utils/supabase/client'
import { Database } from '@/utils/supabase/database.types'
import { useToast } from '@/hooks/use-toast'
import { UserEditType } from '../../data/schema'

type FieldTrainingInsert =
  Database['public']['Tables']['field_training']['Insert']
export type FieldTrainingUpdate =
  Database['public']['Tables']['field_training']['Update']

// 실제 현장실습 데이터 처리 함수 (mutationFn)
const handleFieldTraining = async (editDataList: UserEditType) => {
  for (const editData of editDataList) {
    if (!('field_training' in editData.datas)) continue
    const data = editData.datas.field_training

    if (
      !data ||
      !data.company_id ||
      !data.job_id ||
      !data.start_date ||
      !data.end_date ||
      !data.student_id
    ) {
      throw new Error('누락된 현장 실습 정보가 있습니다.')
    }

    const insertData: FieldTrainingInsert = {
      student_id: data.student_id,
      company_id: data.company_id,
      job_id: data.job_id,
      lead_or_part: false,
      start_date: data.start_date,
      end_date: data.end_date,
    }

    const updateData: FieldTrainingUpdate = {
      lead_or_part: false,
      start_date: data.start_date,
      end_date: data.end_date,
      job_id: data.job_id,
    }

    switch (editData.action) {
      case 'add': {
        const { error } = await supabase
          .from('field_training')
          .insert([insertData])
        if (error) throw new Error(error.message)
        break
      }
      case 'update': {
        const { error } = await supabase
          .from('field_training')
          .update(updateData)
          .eq('student_id', data.student_id)
          .eq('company_id', data.company_id)
          .is('deleted_at', null)
        if (error) throw new Error(error.message)
        break
      }
      case 'delete': {
        const { error } = await supabase
          .from('field_training')
          .update({ deleted_at: new Date().toISOString() })
          .eq('student_id', data.student_id)
          .eq('company_id', data.company_id)
          .eq('job_id', data.job_id)
          .is('deleted_at', null)
        if (error) throw new Error(error.message)
        break
      }
    }
  }
}

// react-query mutation hook
export const useHandleFieldTrainingMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: handleFieldTraining,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['field_training'] })
      toast({
        variant: 'default',
        title: '현장실습 데이터 처리 성공!',
        description: JSON.stringify(variables, null, 2),
      })
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: '현장실습 데이터 처리 실패',
        description: error?.message || '알 수 없는 오류가 발생했습니다.',
      })
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isPending,
  }
}
