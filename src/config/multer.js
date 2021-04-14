const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}../../uploads`);
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato no valido'));
    }
  },
};

// pasar la configuracion y el campo
const upload = multer(configMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, error => {
    if (error) {
      res.json({ msg: error });
    }

    return next();
  });
};
