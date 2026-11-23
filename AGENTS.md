# Project Guidelines

## Architecture and Technologies

* The server is written in JavaScript using ES modules (`"type": "module"`) and uses Express 5, Mongoose, and Joi.
* The entry point is `app.js`. The MongoDB connection is configured in `config/db.js`; API routes are in `routes/`; request logic is in `controllers/`; Mongoose schemas are in `models/`; Joi validations are in `validations/`; and shared middleware is in `middlewares/`.
* Preserve the existing separation of concerns: routers connect routes, validations, and controllers; controllers perform API operations through the models and send responses.
* Product routes are mounted under `/products`, and user routes under `/users`. Inspect the existing code before extending users: some code in this area is only a scaffold or example.

## Data Schema

### Product (`models/product.model.js`, collection `products`)

| Field         | Type       | Notes                  |
| ------------- | ---------- | ---------------------- |
| `name`        | `String`   |                        |
| `price`       | `Number`   |                        |
| `description` | `String`   | defaults to `''`       |
| `categories`  | `[String]` | array of category names |

### User (`validations/user.validation.js`)

### User (`models/user.model.js`, collection `users`)

| Field      | Type     | Notes                                |
| ---------- | -------- | ------------------------------------ |
| `username` | `String` | required, unique                     |
| `password` | `String` | required; stored as a bcrypt hash    |
| `address`  | `String` | required                             |
| `phone`    | `String` | required                             |

Passwords are hashed with `bcryptjs` (10 salt rounds) before saving and are never returned in responses. `utils/generateToken.js` creates a JWT (signed with `JWT_SECRET`, expires in 1h) that is returned on register and login.

* `signInSchema`: `username` (string, required), `password` (string, required).
* `registerSchema`: `username`, `password`, `repeatPassword` (must equal `password`), `address`, `phone`. All are required strings.
* `updatePasswordSchema`: `password`, `repeatPassword` (must equal `password`). Both are required strings.

When a user model is added, keep its field names and types aligned with these Joi schemas.

### Order (`models/order.model.js`, collection `orders`)

| Field      | Type     | Notes                                                       |
| ---------- | -------- | ----------------------------------------------------------- |
| `date`     | `Date`   |                                                             |
| `address`  | embedded | `city` (String, required), `street` (String), `num` (Number) |
| `products` | array    | each item: `_id` (ObjectId, ref `products`), `name`, `price`, `amount` |

Products in an order use both approaches: `_id` references the original product, while `name` and `price` are copied so the order keeps the values from the time it was placed. Product `categories` are intentionally not copied into orders.

## Code Conventions

* Use `import`/`export` and include `.js` extensions in local import paths, consistent with the project files.
* Keep naming and formatting consistent with nearby files. Use `async`/`await` for asynchronous Mongoose operations.
* Pass HTTP errors using `throw new AppError(message, status, type)` from `utils/AppError.js`; do not create a separate error response format. `AppError` extends `Error`. `middlewares/errors.middleware.js` is responsible for converting errors into JSON responses. Express 5 forwards errors thrown in async handlers automatically, so do not wrap handlers in `try/catch` only to call `next(err)`.
* Add server-side validation with Joi for new or modified routes, using `validateBody` from `middlewares/validateJoi.middleware.js`. Define the corresponding schema under `validations/`.
* Keep every Joi schema aligned with its corresponding Mongoose schema: use matching field names, data types, and nested object/array shapes, and preserve Mongoose-required semantics. Document and validate any stricter, endpoint-specific requirements separately.
* Preserve response shapes and status codes used by the existing code (for example, `201` for creation and `404` when a resource is not found). Validate IDs before ID-based operations, and also check whether the document exists.

## Running and Testing

* Install dependencies: `npm install`.
* Start the development server with `.env` loading and file watching: `npm run dev`.
* Start the server normally: `npm start`.
* The server uses `PORT` (defaults to `4000`) and `MONGO_URI` (set in `.env`, read in `config/db.js`).
* There is currently no test infrastructure; the `npm test` script is a placeholder that intentionally fails. Do not report it as a successful test, and add or update tests when test infrastructure is introduced.

## Git Workflow

* Never work directly on `main`. Open a new branch for every feature or bug fix.
* Merge into `main` only through a pull request.