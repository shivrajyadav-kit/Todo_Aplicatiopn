// middleware/logger.js

const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.log(`[${now}] ${method} ${url} - IP: ${ip}`);
  next(); // Proceed to next middleware or route
};

export default requestLogger;
