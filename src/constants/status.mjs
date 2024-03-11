/* Mapping of status codes used to indicate the outcome of handling an event or request. */
export const StatusCodes = {
    /* success codes */
    NO_CONTENT: 204,
    /* client error codes */
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    /* server error codes */
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};
