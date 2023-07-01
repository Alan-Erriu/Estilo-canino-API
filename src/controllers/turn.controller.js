import Turn from "../models/Turn.js";
import moment from "moment";

// el cliente crea un nuevo turno-------------------------
export const createTurnByClient = async (req, res) => {
  try {
    const { date, month, year, day, time, groomer, dog, client } = req.body;
    //convierte los inputs del usario a un formato que la librerìa moment entienda YYYY-MM-DD HH:mm
    const selectedDateTime = moment(`${year}-${month}-${date} ${time}`);
    //consulta el momento actual  ej:2023-06-27 10:00
    const currentDateTime = moment();
    //pregunta si la fecha ingresada por el usuario es valida
    if (!selectedDateTime.isValid()) {
      return res.status(400).json({ message: "Invalid date and time" });
    }
    //consulta si la fecha ingresada por el usuario es anterior al momento actual, no se puede resevar un turno para una fecha pasada
    if (selectedDateTime.isBefore(currentDateTime)) {
      return res
        .status(400)
        .json({ message: "Selected date and time is in the past" });
    }
    // Verificar si existen citas para el perro y el peluquero en el mismo día y horario
    const existingTurns = await Turn.find({
      date,
      month,
      year,
      day,
      time,
      groomer,
      dog,
    });

    if (existingTurns.length > 0) {
      return res
        .status(400)
        .json({ message: "Turn already exists for the given date and time" });
    }

    // Verificar si hay un turno anterior al horario deseado
    const previousTurn = await Turn.findOne({
      day,
      time: { $lt: time },
      groomer,
    }).sort({ time: -1 });

    if (previousTurn) {
      // Calcular la diferencia de tiempo entre el turno anterior y el turno deseado
      const previousTime = parseInt(previousTurn.time.replace(":", ""));
      const currentTime = parseInt(time.replace(":", ""));
      const minTimeDiff = 100; // 1 hora en formato HH:mm (por ejemplo, 09:00)

      if (previousTime >= currentTime) {
        return res.status(400).json({
          message: "Cannot schedule a turn within 1 hour of the previous turn",
        });
      }

      if (previousTime + minTimeDiff > currentTime) {
        return res.status(400).json({
          message: "Cannot schedule a turn within 1 hour of the previous turn",
        });
      }
    }

    const turn = new Turn({
      date,
      month,
      year,
      day,
      time,
      groomer,
      dog,
      client,
      availability: false,
    });

    const savedTurn = await turn.save();

    return res.status(200).json(savedTurn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating turn" });
  }
};

export const getAvailableTurnsByDate = async (req, res) => {
  try {
    const { date, month, year, day, groomerId } = req.body;
    console.log(date, month, year, day, groomerId);
    // Realizar una consulta para obtener las citas reservadas para el día y el peluquero específico
    const appointments = await Turn.find({
      date,
      month,
      year,
      day,
      groomer: groomerId,
    });

    // Generar una lista de horarios disponibles para el día seleccionado
    const allSlots = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ];

    // Eliminar los horarios que ya están reservados
    const reservedSlots = appointments.map((appointment) => appointment.time);
    const availableSlots = allSlots.filter(
      (slot) => !reservedSlots.includes(slot)
    );

    // Obtener la hora actual
    const currentTime = moment();

    // Retornar los horarios disponibles al cliente

    return res.status(200).json({ availableSlots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting available turns" });
  }
};
// trae todos los turnos ordenados de menor a mayor (fecha)
export const getAllTurns = async (req, res) => {
  try {
    const turns = await Turn.find().sort({ year: 1, month: 1, date: 1 });

    return res.status(200).json(turns);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting turns" });
  }
};
//

export const getAppointmentsByGroomerAndDate = async (req, res) => {
  try {
    const { groomerId, date, month, year } = req.body;

    // Busca los turnos en la base de datos para el peluquero y fecha especificados
    const appointments = await Turn.find({
      groomer: groomerId,
      date: date,
      month: month,
      year: year,
    })
      .populate("dog", "name")
      .populate("client", "name")
      .populate("groomer", "name");

    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};
// todos los turnos por  cliente especifico
export const getAppointmentsByClientId = async (req, res) => {
  try {
    const { clientId } = req.body;

    // Busca los turnos en la base de datos para el peluquero y fecha especificados
    const appointments = await Turn.find({
      client: clientId,
    })
      .populate("dog", "name")
      .populate("client", "name")
      .populate("groomer", "name");

    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};
//todos los turnos por  perro especifico
export const getAppointmentsByDogId = async (req, res) => {
  try {
    const { dogId } = req.body;

    // Busca los turnos en la base de datos para el peluquero y fecha especificados
    const appointments = await Turn.find({
      dog: dogId,
    })
      .populate("dog", "name")
      .populate("client", "name")
      .populate("groomer", "name");

    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

//borrar un turno por id

export const deleteTurnById = async (req, res) => {
  try {
    const { _id } = req.params;

    // Buscar y eliminar el turno por su ID
    const deletedTurn = await Turn.findByIdAndDelete(_id);

    if (!deletedTurn) {
      return res.status(404).json({ message: "Turn not found" });
    }

    return res.status(200).json({ message: "Turn deleted successfully" });
  } catch (error) {
    console.error("Error deleting turn:", error);
    return res.status(500).json({ message: "Error deleting turn" });
  }
};
