export interface PriorityState {
  name: string;
  color: string;
}

export interface CategoryState {
  name: string;
}

export interface Task {
  _id: string;
  name: string;
  dateTime: string;
  deadline: string;
  priority?: PriorityState;
  category?: CategoryState[];
  completed: boolean;
  createdBy?: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
