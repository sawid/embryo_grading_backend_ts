import { Grade } from "../schemas/Grade";
import { validateCreateData, validateMatchData } from "../services/ocr.validator";
const fs = require('fs');
import path from 'path';
import express, { Request, Response } from 'express';
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

        grade = await Grade.findOneAndUpdate({ imageId: req.body.imageId}, { imageName: req.body.imageName, grade: req.body.grade })

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

// Get Professor List Data 
export const getProfessorList = async (req: Request, res: Response) => {
    try {
        const directoryPath = '../test_image_set'; // Replace with the actual path

        fs.readdir(directoryPath, (err : any, files : any) => {
          if (err) {
            console.error('Error reading the directory:', err);
            return res.status(500).send(err.message);
          }
    
          // Filter out non-directories
          const directories = files.filter((file: string) => {
            return fs.statSync(path.join(directoryPath, file)).isDirectory();
          });
    
          console.log('List of directories:');
          console.log(directories);
    
          return res.send(directories);
        });
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
}

// Get Embryo List Data 
export const getEmbryoList = async (req: Request, res: Response) => {
    try {
    const searchStr = req.query.search as string; // Assuming the search string is passed as a query parameter
    const directoryPath = '../test_image_set'; // Replace with the actual path

    var searchResult = await searchDirectories(directoryPath, searchStr);
    
    console.log(`Found ${searchResult.length} directories containing '${searchStr}':`);
    console.log(searchResult);

    return res.send(searchResult);
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
}

export const insertOrUpdateGrade = async (req: Request, res: Response): Promise<any> => {

  try {
    await Grade.findOneAndUpdate(
      { imageName: req.body.imageName },
      { $set: { grade: req.body.grade } },
      { upsert: true }
    );
    return res.send("Success");
  } catch (error) {
    console.error(`Error inserting/updating grade for ${req.body.imageName}: ${error}`);
    return res.status(500).send(error);
  } 
};

const searchDirectories = async (directoryPath: string, searchStr: string): Promise<any[]> => {
  const result: any[] = [];

  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    console.log(filePath)

    if (stats.isDirectory()) {
      // Check if the directory name contains the search string
      if (file.includes(searchStr) && filePath.split("/").length >= 5) {
        const parts = filePath.split('/');
        const professor = parts[2];
        const year = parts[3];
        const patient_name = parts[4];

        let image_name_data = await searchFiles(filePath, "");
        result.push({
          professor,
          year,
          patient_name,
          image_name: image_name_data,
        });
      }

      // Recursively search subdirectories
      const subDirectories = await searchDirectories(filePath, searchStr);
      result.push(...subDirectories);
    }
  }

  return result;
};



const searchFiles = async (directoryPath: string, searchStr: string): Promise<any[]> => {
  const result: any[] = [];
  const validExtensions = ['.jpg', '.png', '.jpeg'];
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const subFiles = await searchFiles(filePath, searchStr);
      result.push(...subFiles);
    } else {
      const extension = path.extname(file).toLowerCase();
      // Check if the file has a valid extension (jpg or png) and if the file name contains the search string
      if (validExtensions.includes(extension) && file.includes(searchStr)) {
        try {
          const queryResult = await Grade.findOne({ imageName: filePath });
          if (queryResult) {
            result.push({
              filePath: filePath,
              grade: queryResult.grade.toString(),
            });
          } else {
            result.push({
              filePath: filePath,
              grade: "None",
            });
          }
        } catch (error) {
          console.error(`Error fetching grade for ${filePath}: ${error}`);
        }
      }
    }
  }

  console.log(result);
  return result;
};
