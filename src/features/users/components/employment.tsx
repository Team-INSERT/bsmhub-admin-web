import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { getCurrentFieldTraining } from '@/utils/users/getCurrentFieldTraining'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCompanyListQuery } from '@/features/companies/services/selectCompanyList'
import { useEditUser } from '../context/edit-context'
import { useUsers } from '../context/users-context'
import { UserDetailType } from '../data/schema'
import { FieldTrainingUpdate } from '../services/field-training/handleFieldTraining'
import { useJobListQuery } from '../services/field-training/selectJobList'

type addFieldTrainingType = Pick<
  FieldTrainingUpdate,
  'company_id' | 'start_date' | 'end_date' | 'job_id'
>

export const Employment = ({
  datas,
}: {
  datas: UserDetailType['employment_companies']
}) => {
  const { editingSection, setEditData } = useEditUser()
  const { currentRow } = useUsers()

  const { data: companies = [] } = useCompanyListQuery()
  const { data: jobs = [] } = useJobListQuery()

  const currentFieldTraining =
    datas.length > 0 ? getCurrentFieldTraining({ datas }) : null

  const [updateDate, setUpdateDate] = useState<DateRange | undefined>(undefined)
  const [updateJob, setUpdateJob] = useState<number | null>(null)
  const [isWorking, setIsWorking] = useState<boolean>(true)

  const [addDate, setAddDate] = useState<DateRange | undefined>(undefined)
  const [addFieldTraining, setAddFieldTraining] =
    useState<addFieldTrainingType | null>(null)
  const [add, setAdd] = useState<boolean>(false)

  useEffect(() => {
    if (!editingSection) {
      setUpdateDate({
        from: currentFieldTraining?.start_date
          ? new Date(currentFieldTraining.start_date)
          : new Date(),
        to: currentFieldTraining?.end_date
          ? new Date(currentFieldTraining.end_date)
          : new Date(),
      })
      setUpdateJob(currentFieldTraining?.job_id ?? null)
      setIsWorking(currentFieldTraining?.is_working ?? true)
      setAddDate(undefined)
      setAddFieldTraining(null)
      setAdd(false)
    }
  }, [editingSection, currentFieldTraining])

  useEffect(() => {
    if (
      editingSection === 'employment' &&
      updateDate?.from &&
      updateDate?.to &&
      updateJob !== null &&
      currentFieldTraining &&
      currentRow
    ) {
      setEditData([
        {
          action: 'update',
          datas: {
            employment_companies: {
              student_id: currentRow.student_id,
              company_id: currentFieldTraining.company_id,
              job_id: updateJob,
              start_date: updateDate.from.toISOString().split('T')[0],
              end_date: updateDate.to.toISOString().split('T')[0],
              is_working: isWorking,
            },
          },
        },
      ])
    }
  }, [
    updateDate,
    updateJob,
    isWorking,
    editingSection,
    currentFieldTraining,
    currentRow,
    setEditData,
  ])

  return (
    <div>
      {editingSection === 'employment' ? (
        <div className='space-y-4'>
          {/* 취업 수정 */}
          <div className='space-y-4'>
            {currentFieldTraining && (
              <div className='relative rounded-md border p-3'>
                <div className='grid grid-cols-1 gap-3'>
                  <div className='space-y-2'>
                    <span className='font-medium'>취업 기간</span>
                    <div className='flex justify-center'>
                      <Calendar
                        mode='range'
                        selected={updateDate}
                        onSelect={setUpdateDate}
                        className='rounded-lg border border-border p-2'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <span className='font-medium'>취업 직무</span>
                    <Select
                      value={String(updateJob)}
                      onValueChange={(value) => setUpdateJob(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='취업 직무를 선택하세요.' />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.map((job) => (
                          <SelectItem
                            key={job.job_id}
                            value={String(job.job_id)}
                          >
                            {job.job_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <span className='font-medium'>회사명</span>
                    <Select
                      value={String(currentFieldTraining.company_id)}
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='회사명을 선택하세요.' />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem
                            key={company.company_id}
                            value={String(company.company_id)}
                          >
                            {company.company_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <span className='font-medium'>취업 중</span>
                      <Switch
                        id='is-working'
                        checked={isWorking}
                        onCheckedChange={setIsWorking}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 새 취업 추가 */}
          <div
            className={`${add ? 'border' : 'border border-dashed'} rounded-md p-3`}
          >
            <h4 className='mb-3 font-medium'>새 취업 추가</h4>
            <div className='grid grid-cols-1 gap-3'>
              <div className='space-y-2'>
                <span className='font-medium'>취업 기간</span>
                <div className='flex justify-center'>
                  <Calendar
                    mode='range'
                    selected={addDate}
                    onSelect={(range) => {
                      setAddDate(range)
                      setAddFieldTraining((prev) => ({
                        ...prev,
                        start_date:
                          range?.from?.toISOString().split('T')[0] ?? '',
                        end_date: range?.to?.toISOString().split('T')[0] ?? '',
                      }))
                    }}
                    className='rounded-lg border border-border p-2'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <span className='font-medium'>취업 직무</span>
                <Select
                  onValueChange={(value) => {
                    setAddFieldTraining((prev) => ({
                      ...prev,
                      job_id: Number(value),
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='취업 직무를 선택하세요.' />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.job_id} value={String(job.job_id)}>
                        {job.job_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <span className='font-medium'>회사명</span>
                <Select
                  onValueChange={(value) => {
                    setAddFieldTraining((prev) => ({
                      ...prev,
                      company_id: Number(value),
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='회사명을 선택하세요.' />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.company_id}
                        value={String(company.company_id)}
                      >
                        {company.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!add && (
                <Button
                  className='mt-2'
                  onClick={() => {
                    if (
                      addFieldTraining &&
                      currentRow?.student_id &&
                      addFieldTraining.company_id &&
                      addFieldTraining.job_id &&
                      addFieldTraining.start_date &&
                      addFieldTraining.end_date
                    ) {
                      setAdd(true)
                      setEditData([
                        {
                          action: 'add',
                          datas: {
                            employment_companies: {
                              ...addFieldTraining,
                              student_id: currentRow.student_id,
                              created_at: String(new Date()),
                            },
                          },
                        },
                      ])
                    } else {
                      alert('누락된 취업 정보가 있습니다.')
                    }
                  }}
                >
                  취업 추가
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {currentFieldTraining ? (
            <div className='space-y-4'>
              <div className='rounded-md border p-3'>
                <dl className='space-y-2'>
                  <div className='flex gap-2'>
                    <dt className='w-24 flex-shrink-0 font-medium'>
                      취업 기간:
                    </dt>
                    <dd>{currentFieldTraining.start_date ?? '-'}</dd> ~{' '}
                    <dd>{currentFieldTraining.end_date ?? '-'}</dd>
                  </div>
                  <div className='flex gap-2'>
                    <dt className='w-24 flex-shrink-0 font-medium'>
                      취업 직무:
                    </dt>
                    <dd>{currentFieldTraining.jobs.job_name ?? '-'}</dd>
                  </div>
                  <div className='flex gap-2'>
                    <dt className='w-24 flex-shrink-0 font-medium'>회사명:</dt>
                    <dd>
                      {currentFieldTraining.companies.company_name ?? '-'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            <div className='mt-4 flex justify-center'>
              학생의 취업 정보가 존재하지 않습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
