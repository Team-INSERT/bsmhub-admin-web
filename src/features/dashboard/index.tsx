import { useRef } from 'react'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
  const { theme } = useTheme()
  const grafanaSrc = `/d/degaj6kbosoowe/bsmhubtest?orgId=1&from=now-30d&to=now&timezone=browser&var-join_at_year=$__all&refresh=auto&kiosk&theme=${
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme
  }`
  const objectRef = useRef<HTMLObjectElement>(null)

  const handleFullscreen = () => {
    const el = objectRef.current
    if (!el) return
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (
      (el as HTMLObjectElement & { webkitRequestFullscreen?: () => void })
        .webkitRequestFullscreen
    ) {
      ;(el as HTMLObjectElement & { webkitRequestFullscreen?: () => void })
        .webkitRequestFullscreen!()
    } else if (
      (el as HTMLObjectElement & { msRequestFullscreen?: () => void })
        .msRequestFullscreen
    ) {
      ;(el as HTMLObjectElement & { msRequestFullscreen?: () => void })
        .msRequestFullscreen!()
    }
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main fixed>
        <div className='relative h-full w-full'>
          <object
            ref={objectRef}
            key={theme}
            type='text/html'
            data-testid='grafana-iframe'
            data={grafanaSrc}
            className='h-full min-h-[600px] w-full rounded-lg bg-background'
          ></object>
          <Button
            type='button'
            onClick={handleFullscreen}
            variant='default'
            size='sm'
            className='absolute bottom-4 right-4 z-10'
            style={{ pointerEvents: 'auto' }}
          >
            전체화면
          </Button>
        </div>
      </Main>
    </>
  )
}
