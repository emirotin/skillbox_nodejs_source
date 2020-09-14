const fs = require("fs");

const { Encoder: PNGEncoder, Decoder: PNGDecoder } = require("png-stream");
const ColorTransform = require("color-transform");

fs.createReadStream("cat.png")
  .pipe(
    new PNGDecoder({
      format: "rgba",
    })
  )
  .pipe(new ColorTransform("rgba", "graya"))
  .pipe(
    new PNGEncoder({
      colorSpace: "graya",
    })
  )
  .pipe(fs.createWriteStream("gray-cat.png"));
