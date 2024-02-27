import organizationModel from "../models/organizationModel.js";
import programModel from "../models/programModels.js";

export const createProgramController = async (req, res) => {
  try {
    const { programName, image, time, location } = req.body;

    if (!programName || !image || !time || !location) {
      res.json({
        message: "all fields  are required ",
      });
    }
    const program = await organizationModel.create({
      programName: programName,
      image: req.file.path,
      ProgramTime: time,
      location: location,
      programCreatedBy: req.user.userId
    });
    
    await program.save();
    res.status(201).send({ program: program });
  } catch (err) {
    console.log("this is an error", err);
  }
};

export const getAllProgramController = async (req, res) => {
  try {
    const programs = await programModel.find({
      programCreatedBy: req.user.userId,
    });
    
    res.status(200).send({ programs: programs });
  } catch (err) {
    console.log("this is an error", err);
  }
};

export const updateProgramController = async (req, res) => {
  try {
    const { id } = req.params;
    const { programName, image, time, location } = req.body;

    if (!programName || !image || !time || !location) {
      res.send({
        message: "all fields are required",
      });
    }

    const program = await programModel.findOne({ _id: id });

    if (!program) {
      res.send({
        message: `no program found for this id ${id}`,
      });
    }

    const updateProgram = await programModel.findByIdAndUpdate(
      { _id: id },

      {
        programName: programName,
        image: req.file.path,
        ProgramTime: time,
        location: location,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      updateProgram : updateProgram
    });
  } catch (err) {
    console.log("this is an error", err);
  }
};

export const deleteProgramController = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programModel.findOne({ _id: id });

    if (!program) {
      res.send({
        message: "program not found for this id",
      });
    }

    if (!req.user.userId === program.programCreatedBy.toString()) {
      res.send({
        message: "You are not allowed to delete this Program",
      });
      return;
    }
    await program.deleteOne();
    res.status(200).json({ message: "Program delete successfully" });
  } catch (err) {
    console.log("this is an error", err);
  }
};
