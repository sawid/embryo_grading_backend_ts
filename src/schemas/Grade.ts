import { model, Schema } from "mongoose";

interface IGrade {
    imageId: String;
    imageName: String;
    grade: String;
  }

const GradeSchema = new Schema<IGrade>(
  {
    imageId: String,
    imageName: String,
    grade: String,
  },
  { timestamps: true }
);

export const Grade = model<IGrade>("grades", GradeSchema);