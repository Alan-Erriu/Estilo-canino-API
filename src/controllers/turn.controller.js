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

    // Filtrar los horarios futuros
    const futureSlots = availableSlots.filter((slot) => {
      const slotTime = moment(slot, "HH:mm");
      return slotTime.isAfter(currentTime);
    });

    // Retornar los horarios disponibles al cliente
    return res.status(200).json({ futureSlots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting available turns" });
  }
};
