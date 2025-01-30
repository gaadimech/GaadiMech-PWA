export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  data: {
    id: number;
    attributes: ContactFormData & {
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
}

export interface ContactError {
  error: {
    status: number;
    name: string;
    message: string;
  };
} 