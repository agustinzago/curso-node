import * as env from 'env-var';
import 'dotenv/config'

// Read a PORT environment variable and ensure it's a positive integer.
// An EnvVarError will be thrown if the variable is not set, or if it
// is not a positive integer.
const PORT: number = env.get('PORT').required().asPortNumber();
const MAILER_EMAIL: string = env.get('MAILER_EMAIL').required().asEmailString()
const MAILER_SECRET_KEY: string = env.get('MAILER_SECRET_KEY').required().asString()
const PROD: boolean = env.get('PROD').required().asBool()

export const envs = {
    PORT,
    MAILER_EMAIL,
    MAILER_SECRET_KEY,
    PROD
}