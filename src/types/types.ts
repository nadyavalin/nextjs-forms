export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
  terms: boolean;
}

export interface FormState extends Omit<FormData, "picture"> {
  picture: string | null;
  isNew?: boolean;
}

export interface ErrorState {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  country?: string;
  picture?: string;
  terms?: string;
}

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
  terms: boolean;
}

export interface FormState extends Omit<FormValues, 'picture'> {
  picture: string | null;
  isNew?: boolean;
}