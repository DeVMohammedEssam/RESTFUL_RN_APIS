const compress_images = require("compress-images");

module.exports = () => {
  let finished = false;
  compress_images(
    "assets/images/**/*.{jpg,JPG,jpeg,JPEG,png}",
    "assets/images/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50"] } },

    function(err, completed) {
      if (completed === true) {
        finished = true;
      }
    }
  );
  return finished;
};
