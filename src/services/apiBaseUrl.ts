export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  //TASK
  FETCH_ALL: '/task/all',
  CREATE_TASK: '/task/create',
  UPDATE_TASK: (id: string) => `/task/edit/${id}`,
  DELETE_TASK: (id: string) => `/task/delete/${id}`,
};
