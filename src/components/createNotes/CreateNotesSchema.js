import * as yup from "yup"

export const CreateNotesSchema = yup.object().shape({
    title:yup.string().required('title is required'),
    content:yup.string().required('content is requird'),
    subject:yup.string().required('subject is required'),
    file:yup.mixed().test(
        "fileRequired",
        "A file is required",
        (value) =>typeof value !== null && typeof value !== "undefined" && typeof value !== "string"
      ).required('file is required'),

})

export const updateNoteSchema = yup.object().shape({
  title:yup.string().required('title is required'),
    content:yup.string().required('content is requird'),
    subject:yup.string().required('subject is required'),

})