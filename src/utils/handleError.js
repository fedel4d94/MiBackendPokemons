export const handleError = (res, error) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    const duplicatedValue = error.keyValue[duplicatedField];

    return res.status(409).json({
      error: `El valor '${duplicatedValue}' ya existe en el campo '${duplicatedField}, dentro de la tabla'.`,
    });
  }

  if (error.name === "ValidationError") {
    const message = error.message;
    return res.status(400).json({ message });
  }

  const status = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(status).json({ message });
};
