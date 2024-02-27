import programModel from "../models/programModels.js";
import signUpModel from "../models/signUpModel.js";

export const registerInProgramController = async (req, res) => {
  try {
    const { programId, parentId } = req.body;
    const program = await programModel.findById({ _id: programId });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const parent = await signUpModel.findById({ _id: parentId });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res .status(200).json({ message: "Parent subscribed to program successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }


};

export const subscribedProgramsController = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await signUpModel.findById({ _id: parentId });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const subscribedPrograms = await programModel.find({
      subscribers: parentId,
    });
    res.status(200).json({ subscribedPrograms });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

export const unsubscribedProgramsController = async (req, res) => {
  try {
    const { parentId, programId } = req.body;

    await programModel.findByIdAndUpdate(programId, {
      $pull: { subscribers: parentId },
    });

    res.status(200).json({ message: "Unsubscribed from program successfully" });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

export const allprogramsController = async (req, res) => {
  try {
    try {
      const allPrograms = await programModel.find();
      res.status(200).json({ allPrograms });
    } catch (err) {
      res.status(500).json({ message: `${err.message}` });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};
