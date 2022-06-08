import dotenv from 'dotenv';

dotenv.config();

const{
    PORT,
    ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    BCRYPT,
    SALT_ROUNDS,
    TOKEN_SECRET
} = process.env;

export default {
    port: PORT,
    host: POSTGRES_HOST,
    databasePort: POSTGRES_PORT,
    database: ENV === 'dev'? POSTGRES_DB : POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper:BCRYPT,
    salt:SALT_ROUNDS,
    token:TOKEN_SECRET
};