export interface ContactApiRequest {
  email: string;
  message: string;
}

export interface ContactApiResponse {
  data?: string;
  error?: string;
}
