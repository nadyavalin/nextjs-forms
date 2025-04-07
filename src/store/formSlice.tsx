import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "../types/types";

interface FormSliceState {
  forms: FormState[];
  lastSubmittedForm: FormState | null;
}

const initialState: FormSliceState = {
  forms: [],
  lastSubmittedForm: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormState>) {
      const newForm: FormState = { ...action.payload, isNew: true };
      state.forms.push(newForm);
      state.lastSubmittedForm = newForm;
    },
    removeNewIndicator(state, action: PayloadAction<number>) {
      const formIndex = state.forms.findIndex((form) => form.id === action.payload);
      if (formIndex !== -1) {
        state.forms[formIndex].isNew = false;
        if (state.lastSubmittedForm?.id === action.payload) {
          state.lastSubmittedForm.isNew = false;
        }
      }
    },
  },
});

export const { addForm, removeNewIndicator } = formSlice.actions;
export default formSlice.reducer;
