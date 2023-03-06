const tesseract = require("node-tesseract-ocr")

export const testOCR = async (req: any, res: any) => {
    const config = {
        lang: "eng", // default
        oem: 3,
        psm: 3,
    }

    try {
        const text = await tesseract.recognize("https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2021/02/19/ML-1955-2.jpg", config)
        console.log("Result:", text)
        return res.send(text);
      } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
      }
}