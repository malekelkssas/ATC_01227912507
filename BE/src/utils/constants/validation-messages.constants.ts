export const VALIDATION_MESSAGES = {
    /**
     * Events
     */
    EVENT: {
        NAME: {
            EN: {
                REQUIRED: "English name is required",
                INVALID_TYPE: "English name must be a string",
                MIN_LENGTH: "English name must be at least 3 characters long",
                MAX_LENGTH: "English name must be less than 30 characters"
            },
            AR: {
                REQUIRED: "Arabic name is required",
                INVALID_TYPE: "Arabic name must be a string",
                MIN_LENGTH: "Arabic name must be at least 3 characters long",
                MAX_LENGTH: "Arabic name must be less than 30 characters"
            },
            INVALID_TYPE: "Name must be an object",
            EMPTY: "At least one language field must be provided for name",
            REQUIRED_OBJECT: "Name is required"
        },
        DESCRIPTION: {
            EN: {
                REQUIRED: "English description is required",
                INVALID_TYPE: "English description must be a string",
                MIN_LENGTH: "English description must be at least 10 characters long",
                MAX_LENGTH: "English description must be less than 1000 characters"
            },
            AR: {
                REQUIRED: "Arabic description is required",
                INVALID_TYPE: "Arabic description must be a string",
                MIN_LENGTH: "Arabic description must be at least 10 characters long",
                MAX_LENGTH: "Arabic description must be less than 1000 characters"
            },
            INVALID_TYPE: "Description must be an object",
            EMPTY: "At least one language field must be provided for description",
            REQUIRED_OBJECT: "Description is required"
        },
        VENUE: {
            EN: {
                REQUIRED: "English venue is required",
                INVALID_TYPE: "English venue must be a string",
                MIN_LENGTH: "English venue must be at least 3 characters long",
                MAX_LENGTH: "English venue must be less than 30 characters"
            },
            AR: {
                REQUIRED: "Arabic venue is required",
                INVALID_TYPE: "Arabic venue must be a string",
                MIN_LENGTH: "Arabic venue must be at least 3 characters long",
                MAX_LENGTH: "Arabic venue must be less than 30 characters"
            },
            INVALID_TYPE: "Venue must be an object",
            EMPTY: "At least one language field must be provided for venue",
            REQUIRED_OBJECT: "Venue is required"
        },
        CATEGORY: {
            REQUIRED: "Category is required",
            INVALID_TYPE: "Category must be an array",
            INVALID_ID: "Invalid category ID format",
            MIN_ITEMS: "Category must be at least 1 item",
            MAX_ITEMS: "Category must be less than 4 items"
        },
        IMAGE_URL: {
            REQUIRED: "Image URL is required",
            INVALID_TYPE: "Image URL must be a string"
        },
        PRICE: {
            REQUIRED: "Price is required",
            INVALID_TYPE: "Price must be a number"
        },
        DATE: {
            REQUIRED: "Date is required",
            INVALID_TYPE: "Date must be a valid date"
        },
        UPDATE: {
            EMPTY: "At least one field must be provided for update"
        }
    },

    /**
     * Users
     */
    USER: {
        NAME: {
            REQUIRED: "Name is required",
            MIN_LENGTH: "Name must be at least 3 characters long",
            MAX_LENGTH: "Name must be less than 50 characters"
        },
        EMAIL: {
            REQUIRED: "Email is required",
            INVALID: "Please enter a valid email address",
            WRONG: "Wrong email"
        },
        PASSWORD: {
            REQUIRED: "Password is required",
            MIN_LENGTH: "Password must be at least 8 characters long",
            MAX_LENGTH: "Password must be less than 32 characters",
            WRONG: "Wrong password"
        },
        ROLE: {
            INVALID: "Invalid role"
        }
    },

    /**
     * Tags
     */
    TAG: {
        NAME: {
            EN: {
                REQUIRED: "English name is required",
                MIN_LENGTH: "English name must be at least 3 characters long",
                MAX_LENGTH: "English name must be less than 10 characters"
            },
            AR: {
                REQUIRED: "Arabic name is required",
                MIN_LENGTH: "Arabic name must be at least 3 characters long",
                MAX_LENGTH: "Arabic name must be less than 10 characters"
            },
            INVALID_TYPE: "Name must be an object with 'en' and 'ar' properties",
            REQUIRED_OBJECT: "Name must be an object with 'en' and 'ar' properties"
        },
        COLOR: {
            REQUIRED: "Color is required",
            INVALID_FORMAT: "Invalid color format"
        }
    },

    /**
     * Pagination
     */
    PAGINATION: {
        PAGE: {
            REQUIRED: "Page is required",
            INVALID_TYPE: "Page must be a number"
        },
        LIMIT: {
            REQUIRED: "Limit is required",
            INVALID_TYPE: "Limit must be a number",
            MIN: "Limit must be at least 1",
            MAX: "Limit must be less than or equal to 100"
        }
    },

    /**
     * Auth
     */
    AUTH: {
        SIGN_IN: {
            REQUIRED: "Sign in data is required"
        }
    },

    /**
     * Shared
     */
    INVALID_ID: "Invalid ID format",
    REQUEST_BODY: {
        REQUIRED: "Request body is required",
        INVALID_TYPE: "Request body must be an object"
    }
} as const;
