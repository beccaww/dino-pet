exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/pets';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-pets';
exports.PORT = process.env.PORT || 8080;