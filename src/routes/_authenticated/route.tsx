import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { IconAlertTriangle } from '@tabler/icons-react'
import { AuthSessionMissingError, User } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'
import supabase from '@/utils/supabase/client'
import { SearchProvider } from '@/context/search-context'
import { UserProvider } from '@/context/user-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  loader: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error instanceof AuthSessionMissingError || !user) {
      return redirect({
        to: '/sign-in',
      })
    } else if (error) throw error

    const adminStatus = await getAdminStatus(user.id)

    if (!adminStatus.canAccess) {
      return redirect({
        to: '/403',
      })
    }
    return { user, isReadonly: adminStatus.isReadonly }
  },
})

function ReadOnlyBanner() {
  return (
    <div className='flex items-center justify-center gap-2 bg-warning p-2 text-center text-sm text-warning-foreground'>
      <IconAlertTriangle size={16} />
      <span>
        이 계정은 읽기 전용입니다. 수정 권한을 위해선 insert25.team@gmail.com 로
        연락주세요.
      </span>
    </div>
  )
}

function RouteComponent() {
  const { user, isReadonly } = Route.useLoaderData()
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  return (
    <>
      {isReadonly && <ReadOnlyBanner />}
      <UserProvider user={user || null}>
        <SearchProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <SkipToMain />
            <AppSidebar />
            <div
              id='content'
              className={cn(
                'ml-auto w-full max-w-full',
                'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                'transition-[width] duration-200 ease-linear',
                'flex h-svh flex-col',
                'group-data-[scroll-locked=1]/body:h-full',
                'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
              )}
            >
              <Outlet />
            </div>
          </SidebarProvider>
        </SearchProvider>
      </UserProvider>
    </>
  )
}
async function getAdminStatus(id: string) {
  const [permission, readonly] = await Promise.all([
    supabase.from('web_admin_permission').select('auth_id').eq('auth_id', id),
    supabase.from('web_admin_readonly').select('auth_id').eq('auth_id', id),
  ])

  if (permission.error) {
    throw permission.error
  }
  if (readonly.error) {
    throw readonly.error
  }

  const hasPermission = permission.data && permission.data.length > 0
  const hasReadonly = readonly.data && readonly.data.length > 0

  return {
    canAccess: hasPermission || hasReadonly,
    isReadonly: !hasPermission && hasReadonly,
  }
}
