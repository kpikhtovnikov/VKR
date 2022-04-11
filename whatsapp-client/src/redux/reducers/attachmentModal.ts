import { createSlice, current } from "@reduxjs/toolkit";

const initialState: any = {
  modalFor: null,
  files: [],
  fileInPreview: 0,
};

export const attachmentModalSlice = createSlice({
  name: "attachmentModalReducer",
  initialState,
  reducers: {
    setAttachmentModal: (state, action) => {
      state.modalFor = action.payload;
    },

    addAttachments: (state, action) => {
      state.files.push(...action.payload);
    },

    uploadAttachments: (state, action) => {},

    uploadAttachmentsSuccessful: (state, action) => {},

    uploadAttachmentsFailed: (state, action) => {},

    removeAttachment: (state, action) => {
      console.log(action.payload)
      state.files.splice(action.payload, 1);
      console.log(current(state).files)
    },

    changeFileInPreview: (state, action) => {
      console.log(action.payload)
      state.fileInPreview = action.payload;
    },

    resetFileAttachmentModal: (state, action) => {
      state.modalFor = null;
      state.files = [];
      state.fileInPreview = 0;
    },
  },
});

export const {
  addAttachments,
  changeFileInPreview,
  removeAttachment,
  resetFileAttachmentModal,
  setAttachmentModal,
  uploadAttachments,
  uploadAttachmentsFailed,
  uploadAttachmentsSuccessful,
} = attachmentModalSlice.actions;
