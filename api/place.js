const router = require("express").Router();
const passport = require("passport");
const Place = require("../models/Place");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./assets/images/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg" ||
      mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 } //1 MB
});

/* 
@route:     /api/place/add
@method:    POST
@access:    Private 
*/
router.get(
  "/add",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  (req, res) => {
    const { name, image } = req.body;
    const newPlace = new Place({
      name,
      image: req.file.path
    });
    newPlace
      .save()
      .then(place => res.status(200).json({ place }))
      .catch(error => {
        res.status(500);
        console.error(error);
      });
  }
);

/* 
@route:     /api/place/get-all
@method:    GET
@access:    Private 
*/
router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Place.find({})
      .then(places => {
        if (!places) res.status(404).json({ error: "no places found" });
        else {
          res.status(200).json({ places });
        }
      })
      .catch(err => res.status(500));
  }
);
module.exports = router;
/* 
@route:     /api/place/remove
@method:    DELETE
@access:    Private 
*/
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Place.findByIdAndDelete(req.params.id)
      .then(place => {
        if (!place) res.status(404).json({ error: "place was not found" });
        else {
          res.status(200).json({ success: true });
        }
      })
      .catch(err => res.status(500));
  }
);
module.exports = router;
