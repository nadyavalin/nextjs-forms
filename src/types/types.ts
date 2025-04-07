export interface FormState {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: string | null;
  terms: boolean;
  isNew?: boolean;
}

export interface ErrorState {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  country?: string;
  picture?: string;
  terms?: boolean;
}
