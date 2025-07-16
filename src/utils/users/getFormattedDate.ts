import { format } from "date-fns";

// yyyy-mm-dd 형식의 날짜를 반환하는 함수입니다.
export const getFormattedDate = (date: string | null): string => {
  if (!date) return ""

  const isoDate = date.replace(" ", "T") // 모든 브라우저 호환을 위해 ISO 8601 형식으로 변경했습니다.
  const parsedDate = new Date(isoDate);

  return format(parsedDate, "yyyy-MM-dd");
}