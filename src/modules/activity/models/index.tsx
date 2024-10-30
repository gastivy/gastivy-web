export interface Activity {
  category_id: string;
  start_date: Date;
  end_date: Date;
  is_done: boolean;
  description: string;
}

export interface CreateActivityRequest {
  activities: Activity[];
}
