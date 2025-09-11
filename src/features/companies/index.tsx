import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import Loader from '@/components/loader'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/companies-columns'
import { CompaniesDialogs } from './components/companies-dialogs'
import { CompaniesPrimaryButtons } from './components/companies-primary-buttons'
import { CompaniesTable } from './components/companies-table'
import UsersProvider from './context/companies-context'
import { useCompanyListQuery } from './services/selectCompanyList'

export default function Companies() {
  const { data, isLoading } = useCompanyListQuery()
  if (isLoading) return <Loader />

  return (
    <UsersProvider>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>회사 목록</h2>
            <p className='text-muted-foreground'>
              부산소마고 학생들이 취업/현장실습한 회사들의 목록입니다.
            </p>
          </div>
          <CompaniesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CompaniesTable
            data={(data ?? []).map((item) => ({
              ...item,
              hr_manager_name: item.hr_manager_name || '',
              hr_manager_phone: item.hr_manager_phone || '',
              company_address: item.company_address || '',
            }))}
            columns={columns}
          />
        </div>
      </Main>

      <CompaniesDialogs />
    </UsersProvider>
  )
}
