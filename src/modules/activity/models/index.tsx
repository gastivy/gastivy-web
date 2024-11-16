import { HttpResponse } from "@/types/HttpResponse";
import { boolean } from "yup";

export interface Activity {
  category_id: string;
  start_date: Date;
  end_date: Date;
  is_done: boolean;
  description: string;
}

export interface LogActivity {
  id: string;
  user_id: string;
  category_id: string;
  start_date: Date;
  end_date: Date;
  is_done: boolean;
  seconds: number;
  description: string;
  category_name?: string;
}

export interface CreateActivityRequest {
  activities: Activity[];
}

export type LogActivityResponse = HttpResponse<LogActivity[]>;
