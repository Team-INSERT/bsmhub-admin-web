import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
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
    const { data, error } = await supabase.auth.getUser()
    if (error instanceof AuthSessionMissingError) {
      return redirect({
        to: '/sign-in',
      })
    } else if (error) throw error
    else if (!(await checkAdmin(data.user.id))) {
      return redirect({
        to: '/403',
      })
    }
    return data
  },
})

function RouteComponent() {
  const data: { user: User } = Route.useLoaderData()
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  return (
    <UserProvider user={data?.user || null}>
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
  )
}
async function checkAdmin(id: string) {
  const [permission, readonly] = await Promise.all([
    supabase.from('web_admin_permission').select('auth_id').eq('auth_id', id),
    supabase.from('web_admin_readonly').select('auth_id').eq('auth_id', id),
  ])

  if (permission.error) {
    console.error('Error checking admin permissions:', permission.error)
    throw permission.error
  }
  if (readonly.error) {
    console.error('Error checking admin readonly permissions:', readonly.error)
    throw readonly.error
  }

  return (
    (permission.data && permission.data.length > 0) ||
    (readonly.data && readonly.data.length > 0)
  )
}
