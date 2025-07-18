import { useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase/client";
import { CompanySupabase } from "../data/schema";

export const selectCompanyList = async (): Promise<CompanySupabase[]> => {
  const { data, error } = await supabase
    .from("companies")
    .select("*");

  if (error) {
    console.error("Error fetching companies:", error);
    throw new Error(error.message);
  }
  
  return data;
};


// ✅ TanStack Query를 활용한 커스텀 훅
export const useCompanyListQuery = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: selectCompanyList,
    staleTime: 60000,
    retry: 2,
  });
};
