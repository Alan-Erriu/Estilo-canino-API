import Turn from "../models/Turn.js";

// el cliente crea un nuevo turno-------------------------
export const createTurnByClient = async (req, res) => {
  try {
    const { startDateTime, groomer, dog, client } = req.body;

    const turn = new Turn({
      startDateTime,
      groomer,
      dog,
      client,
    });

    const savedTurn = await turn.save();

    return res.status(200).json(savedTurn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating turn" });
  }
};
// buscar un turno por id--------------------------
export const getTurnById = async (req, res) => {
  try {
    const turnId = req.params.turnId;
    const turn = await Turn.findOne({ _id: turnId });

    if (!turn) {
      return res.status(404).json({ message: "Turn not found" });
    }

    res.status(200).json({ message: "Turn found", turn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// obtener todos los turnos, ordenados por peluqueros (solo el admin puede)------------
export const getAllTurnsByPeluquero = async (req, res) => {
  try {
    const turns = await Turn.find().populate("groomer", "name");

    res.status(200).json({ message: "Turns found", turns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTurns = (req, res) => {};
export const UpdateTurnById = (req, res) => {};

// Cliente elimina un turno suyo
export const deleteTurnById = async (req, res) => {
  try {
    const turnId = req.params.turnId;
    const userId = req.userId;

    const turn = await Turn.findOne({ _id: turnId });

    if (!turn) {
      return res.status(404).json({ message: "Turn not found" });
    }

    // Verificar si el usuario que realiza la solicitud tiene permiso para eliminar el turno
    if (turn.client.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await turn.deleteOne();

    res.json({ message: "Turn successfully removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
