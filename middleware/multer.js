const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const Productmultiplefile = multer({
  storage: storage,
}).fields([
  { name: 'trailer' },
  { name: 'image' },
  // { name: 'banner' },
  { name: 'logo' },
  { name: 'titleImage' },
  // { name: 'cutimage', maxCount: 1 },
  // { name: 'productimage', maxCount: 4 }
]);

module.exports = { upload, Productmultiplefile };
