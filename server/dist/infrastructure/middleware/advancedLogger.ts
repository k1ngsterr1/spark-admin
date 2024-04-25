const express = require("express");

const advancedLogger = (req, res, next) => {
  const start = Date.now();

  const originalSend = res.send.bind(res);

  res.send = (body) => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      requestBody: req.body,
      responseBody: body,
      duration: `${duration}ms`,
    };
    console.log(JSON.stringify(log, null, 2));
    originalSend(body);
  };
  next();
};

export default advancedLogger;
