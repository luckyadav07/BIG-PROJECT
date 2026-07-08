// import multer from "multer";
// 
   // Temporarily hold the file in RAM (Buffer) for fast text extraction
// const storage = multer.memoryStorage();
// 
  // Reject any file that isn't a PDF
// const fileFilter = (req, file, cb) => {
    // if (file.mimetype === "application/pdf") {
        // cb(null, true);
    // } else {
        // cb(new Error("Only PDF files are allowed"), false);
    // }
// };
// 
  // Export middleware with memory storage, a 5MB limit, and the PDF filter
// export const upload = multer({
    // storage: storage,
    // limits: {
        // fileSize: 5 * 1024 * 1024 
    // },
    // fileFilter: fileFilter
// });

import multer from "multer"

// Temporarily hold the file in RAM (Buffer)
const storage = multer.memoryStorage()

// Debug: Log and accept all files temporarily
const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC and DOCX files are allowed."), false);
  }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
})