export const CONSTANTS = {
  KEYS_STORAGE: {
    SESSION_TOKEN: "app-stori-newsletter-token",
  },
  MAX_BYTES_FILE_SIZE: 2 * 1024 * 1024,
  REGEX: {
    NUMBER:  /^\d+$/,
    LETTERS: /[A-Za-zá-ú\s.]$/,
    ALPHANUMERIC: /[0-9A-Za-zá-ú\s.]$/,
    EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    EMAIL_INPUT: /^[A-Za-z0-9._%+-@]+$/,
  },
  RESPONSE_CODES: {
    PAGE_IN_PROGRESS: -1,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    OK: 200,
    SUCCESS: "00",
  },
};
