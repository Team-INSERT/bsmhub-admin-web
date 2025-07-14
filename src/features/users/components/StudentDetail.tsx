'use client'

import { ReactNode } from '@tanstack/react-router'
import { Pencil, Save, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Loader from '@/components/loader'
import { DetailType, useEditUser } from '../context/edit-context'
import { UserDetailType } from '../data/schema'
import { handleEmployment } from '../services/employment-companies/handleEmployment'
import { handleFieldTraining } from '../services/field-training/handleFieldTraining'
import { useUserDetailQuery } from '../services/selectUser'
import { useUserListQuery } from '../services/seleteUserList'
import { AfterCourses } from './after-courses'
import { Employment } from './employment'
import { FieldTraining } from './field-training'
import { MiddleSchool } from './middle-school'
import { MilitaryService } from './military-service'
import { StudentActivities } from './student-activities'
import { StudentCertificates } from './student-certificates'
import { StudentUniversity } from './student-university'

type ValueItemsType = {
  label: string
  component: (data: UserDetailType) => ReactNode
  canEdit?: boolean
}

const componentsMap: Record<DetailType, ValueItemsType> = {
  after_courses: {
    label: '방과후 수강과정',
    component: (data) => <AfterCourses datas={data.student_after_courses} />,
  },
  certificates: {
    label: '취득 자격증',
    component: (data) => (
      <StudentCertificates datas={data.student_certificates} />
    ),
    canEdit: false,
  },
  activities: {
    label: '활동 내용',
    component: (data) => (
      <StudentActivities
        datas={{
          profile: data.profile,
          competitions: data.student_competitions,
        }}
      />
    ),
    canEdit: false,
  },
  field_training: {
    label: '현장 실습',
    component: (data) => <FieldTraining datas={data.field_training} />,
  },
  employment: {
    label: '취업',
    component: (data) => (
      <Employment
        datas={data.employment_companies.filter(
          (item: UserDetailType['employment_companies'][0]) => item.is_working
        )}
      />
    ),
  },
  university: {
    label: '대학교 진학',
    component: (data) => (
      <StudentUniversity datas={data.student_universities} />
    ),
  },
  military: {
    label: '병역',
    component: (data) => <MilitaryService datas={data.military_services} />,
  },
  middle_school: {
    label: '중학교 정보',
    component: (data) => <MiddleSchool datas={data.student_middle_schools} />,
  },
}

export function StudentDetail({ student_id }: { student_id: string }) {
  const { editingSection, setEditingSection, editData, setEditData } =
    useEditUser()
  const { data, isLoading, refetch, isFetching } =
    useUserDetailQuery(student_id)
  const { refetch: userRefetch } = useUserListQuery()

  const saveEditing = async () => {
    if (!editData) return

    // 현장실습 데이터 처리
    const fieldTrainingData = editData.filter(
      (item) => 'field_training' in item.datas
    )
    if (fieldTrainingData.length > 0) {
      await handleFieldTraining(fieldTrainingData)
    }

    // 취업 데이터 처리
    const employmentData = editData.filter(
      (item) => 'employment_companies' in item.datas
    )
    if (employmentData.length > 0) {
      await handleEmployment(employmentData)
    }

    await refetch()
    setEditingSection(null)
    await userRefetch()
    setEditData(null)
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setEditData(null)
  }

  if (isLoading || isFetching)
    return (
      <div className='h-full space-y-6 overflow-auto p-1'>
        <Loader />
      </div>
    )

  return (
    <div className='h-full space-y-4 overflow-auto p-0 sm:space-y-6 sm:p-1'>
      <Card className='border-0 shadow-sm sm:border sm:shadow-md'>
        <CardHeader className='p-3 pb-2 sm:p-6 sm:pb-3'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <CardTitle className='mb-2 text-xl sm:mb-0 sm:text-2xl'>
              {data?.name}
            </CardTitle>
            <div className='flex items-center gap-2'>
              <Badge variant='outline' className='text-xs sm:text-sm'>
                {data?.departments.department_name}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 p-3 sm:space-y-5 sm:p-6'>
          {(Object.keys(componentsMap) as DetailType[]).map((key) => {
            return (
              <div
                key={key}
                className='rounded-md border border-border/40 bg-card p-2 sm:p-3'
              >
                <div className='mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                  <h3 className='mb-1 text-base font-semibold sm:mb-0'>
                    {componentsMap[key].label}
                  </h3>
                  {editingSection === key ? (
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={cancelEditing}
                        className='flex h-8 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive sm:text-sm'
                      >
                        <X size={14} className='sm:mr-1' />
                        <span className='hidden sm:inline'>취소</span>
                      </Button>
                      <Button
                        size='sm'
                        onClick={saveEditing}
                        className='flex h-8 items-center gap-1 bg-gradient-to-r from-primary to-primary/90 text-xs sm:text-sm'
                      >
                        <Save size={14} className='sm:mr-1' />
                        <span className='hidden sm:inline'>저장</span>
                      </Button>
                    </div>
                  ) : componentsMap[key].canEdit !== false ? (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setEditingSection(key)}
                      className='flex h-8 items-center gap-1 self-end text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary sm:text-sm'
                    >
                      <Pencil size={14} className='sm:mr-1' />
                      <span className='hidden sm:inline'>수정</span>
                    </Button>
                  ) : null}
                </div>

                <Separator className='my-2' />

                {data ? (
                  <div className='py-1 text-sm sm:text-base'>
                    {componentsMap[key].component(data)}
                  </div>
                ) : (
                  <div className='py-4 text-center text-sm text-muted-foreground'>
                    학생 정보가 존재하지 않습니다.
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
