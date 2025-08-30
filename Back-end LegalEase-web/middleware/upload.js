const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for case documents
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const caseId = req.params.caseId || 'general';
    const userDir = path.join(uploadsDir, 'documents', `user_${req.user.id}`, `case_${caseId}`);
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    // Create a safe filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const safeName = baseName.replace(/[^a-zA-Z0-9]/g, '_') + '-' + uniqueSuffix + extension;
    
    cb(null, safeName);
  }
});

// Configure storage for constitution documents
const constitutionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const constitutionDir = path.join(uploadsDir, 'constitution');
    
    if (!fs.existsSync(constitutionDir)) {
      fs.mkdirSync(constitutionDir, { recursive: true });
    }
    
    cb(null, constitutionDir);
  },
  filename: (req, file, cb) => {
    // Keep original name for constitution documents
    cb(null, file.originalname);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow certain file types
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only document and image files are allowed!'));
  }
};

// Create multer instances
const uploadDocument = multer({
  storage: documentStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

const uploadConstitution = multer({
  storage: constitutionStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDFs for constitution
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Error: Only PDF files are allowed for constitution documents!'));
    }
  }
});

module.exports = {
  uploadDocument,
  uploadConstitution
};