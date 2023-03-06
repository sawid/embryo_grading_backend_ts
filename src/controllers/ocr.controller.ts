import { Grade } from "../schemas/Grade";
import { validateCreateData, validateMatchData } from "../services/ocr.validator";

// Check Status Data is Valid
export const imageIdIsValid = async (req: any, res: any) => {
    const imageId = req.params.imageId;
    try {
        let grade = await Grade.findOne({ imageId: imageId })
        if (!grade) {
            return res.send(false);
        }
        else {
            return res.send(true);
        }
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
}

// Match with Exist
export const matchData = async (req: any, res: any) => {
    try {
        // check data
        const { error } = await validateMatchData(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let grade = await Grade.findOne({ imageId: req.body.imageId })
        if (!grade) {
            return res.status(400).send("This grade is not existed");
        }

        grade = await Grade.findOneAndUpdate({ imageId: req.body.imageId, imageName: req.body.imageName}, { grade: req.body.grade })

        return res.send("Match Success");
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
}

// Create Data
export const createData = async (req: any, res: any) => {
    try {
        // check data
        const { error } = await validateCreateData(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let grade = await Grade.findOne({ imageId: req.body.imageId })
        if (grade) {
            return res.status(400).send("This grade is existed");
        }

        grade = new Grade({
            imageId: req.body.imageId,
            imageName: req.body.imageName,
            grade: null
        });

        await grade.save();
        
        return res.send("Create Data Success");

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
}