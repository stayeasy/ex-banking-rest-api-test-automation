const { app } = require('./ex-banking-rest-api');
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;

const server = app.listen(PORT, () => {
    console.log(`ExBanking API running on port ${PORT}`);
});

module.exports = server;