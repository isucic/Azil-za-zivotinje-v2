const logging = ((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    }
    next();
});

module.exports = logging