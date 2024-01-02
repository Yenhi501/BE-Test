import {
	body,
	query,
} from 'express-validator';

export const validateGetUser = [
  query('username').optional().isString().withMessage('Username must be a string'),
  query('email').optional().isEmail().withMessage('email must be a correct format '),
  query('pageSize').optional().isInt({ min: 1 }).withMessage('PageSize must be a positive integer'),
];

export const validateUpdateSelfInfo = [
	body('dateOfBirth')
		.optional()
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender')
		.optional()
		.isIn(['Nam', 'Nữ', 'Khác'])
		.withMessage('Gender must be Nam, Nữ, or Khác'),
];

export const validateSearchUsers = [
	query('search').optional().isString().withMessage('Search must be a string'),
	query('gender')
		.optional()
		.isIn(['Nam', 'Nữ', 'Khác'])
		.withMessage('Gender must be Nam, Nữ, or Khác'),
	query('subscriptionType')
		.optional()
		.isInt()
		.withMessage('Subscription type must be a integer'),
	query('sort').optional().isString().withMessage('Sort must be a string'),
	query('sortType')
		.optional()
		.isString()
		.withMessage('Sort type must be a string'),
	query('page').optional().isInt().withMessage('Page must be an integer'),
	query('pageSize')
		.optional()
		.isInt()
		.withMessage('Page size must be an integer'),
];

export const validateUpdateUser = [
	body('userId').isInt().withMessage('User ID must be an integer'),
	body('email').optional().isEmail().withMessage('Invalid email format'),
	body('dateOfBirth')
		.optional()
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender')
		.optional()
		.isIn(['Nam', 'Nữ', 'Khác'])
		.withMessage('Gender must be Nam, Nữ, or Khác'),
];

export const validateCreateUser = [
	body('email').notEmpty().withMessage("Email is required").isEmail().withMessage('Invalid email format'),
	body('dateOfBirth').notEmpty().withMessage("Date Of birth is required")
		.isISO8601()
		.withMessage('Date of birth must be a valid date'),
	body('gender').notEmpty().withMessage("Gender is required")
		.isIn(['Nam', 'Nữ', 'Khác'])
		.withMessage('Gender must be Nam, Nữ, or Khác'),
	body('username').notEmpty().withMessage("Username is required").isString().withMessage('Username must be a string'),
	body('password').notEmpty().withMessage("Password is required").isString().withMessage('Password must be a string'),
];

export const validateDeleteUser = [
	query('userId').notEmpty().withMessage("User Id is required").isInt().withMessage('User ID must be an integer'),
];


export const favoriteMovie = [
	query('movieId').notEmpty().withMessage("Movie Id is required").isInt().withMessage('Movie ID must be an integer'),
];

export const addMovieHistory = [
	query('episodeId').notEmpty().withMessage("Episode Id is required").isInt().withMessage('Movie ID must be an integer'),
	query('duration').notEmpty().withMessage("Duration Id  required").isInt().withMessage('Duration must be an integer'),
];

export const deleteMovieHistory = [
	query('episodeId').notEmpty().withMessage("Episode Id is required").isInt().withMessage('Movie ID must be an integer'),
];


export const watchLater = [
	query('movieId').notEmpty().withMessage("Movie Id is required").isInt().withMessage('Movie ID must be an integer'),
];

