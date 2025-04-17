export type NpsCategory = 'promoter' | 'passive' | 'detractor';

export interface NpsFormData {
  score: number;
  category: NpsCategory;
  selectedFeatures: string;
  feedback: string;
  name?: string;
  mobileNumber?: string;
  serviceType?: number;
  serviceDate?: string;
  express90Mins: boolean;
  feedbackOptions?: string[];
}

export interface NpsResponse {
  data: {
    id: number;
    attributes: {
      score: number;
      category: NpsCategory;
      selectedFeatures: string;
      feedback: string;
      name: string;
      mobileNumber: string;
      serviceType: string;
      serviceDate: string;
      express90Mins: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface NpsError {
  error: {
    status: number;
    name: string;
    message: string;
  };
} 