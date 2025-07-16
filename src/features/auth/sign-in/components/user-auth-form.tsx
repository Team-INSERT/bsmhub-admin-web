import { HTMLAttributes, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { IconBrandGoogle } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='grid gap-2'></div>
      <div className='relative my-2'>
        <Button
          variant='outline'
          className='w-full'
          type='button'
          disabled={isLoading}
          onClick={() => handleGoogleSignIn(navigate)}
        >
          <IconBrandGoogle className='h-4 w-4' /> Google
        </Button>
      </div>
    </div>
  )
}

async function handleGoogleSignIn(navigate: ReturnType<typeof useNavigate>) {
  // 인증 없이 바로 메인 페이지로 이동
  navigate({ to: '/users' })
}
