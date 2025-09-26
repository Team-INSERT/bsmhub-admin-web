import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'

export const getUserComponent = (
  name: string,
  value: string
): React.ReactNode => {
  switch (name) {
    case 'join_at':
      return <Badge variant='outline'>{value}</Badge>

    case 'user_status': {
      return (
        <Badge
          variant={
            value === '취업'
              ? 'default'
              : value === '현장 실습'
                ? 'default'
                : 'destructive'
          }
          className={cn(
            'font-medium',
            value === '취업'
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              : value === '현장 실습'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
          )}
        >
          {value}
        </Badge>
      )
    }

    default:
      return <LongText className='max-w-36'>{String(value)}</LongText>
  }
}
