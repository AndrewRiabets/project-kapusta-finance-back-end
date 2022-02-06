import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi  from 'swagger-ui-express'

import errorMiddleware from './middleware/error.middleware'
import * as swaggerDocument from './swagger/openapi.json'
import authRouter from './routers/auth.route'
import pkg from './swagger/openapi.json'
// import usersRouter from './routes/api/usersRoute'
// import contactsRouter from './routes/api/contactsRoute'
// import { HttpCode, Messages } from './lib/constants'
// import guard from './middleware/guard'
// import resError from './lib/responseError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
// app.use('/api/users', guard, usersRouter)
// app.use('/api/contacts', guard, contactsRouter)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.default))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(pkg))
// app.use(express.static(process.env.STATIC_DIR))

// app.use((req, res) => {
//   res.status(HttpCode.NOT_FOUND).json(resError.notFound())
// })

app.use(errorMiddleware)
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).json({
//     status: 'fail',
//     code: HttpCode.INTERNAL_SERVER_ERROR,
//     message: err.message,
//     data: Messages.INTERNAL_SERVER_ERROR,
//   });
// })

export default app