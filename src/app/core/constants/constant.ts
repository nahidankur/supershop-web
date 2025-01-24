export class Constants {
    static LOGIN_ROUTE = '/auth/sign-in';
    static MOBILE_NO_REGEX = /^((01[3-9]{1})[0-9]{8})$/;
    static AUTH_STORE_KEY = 'AtDZzoc86kCT0ylG';
    static CURRENT_MODULE_KEY = 'MmN4Rc1v5QnwfM0s';
    static PAGE_SIZE = 10;
    static NID_REGEX = '^([0-9]{10}|[0-9]{13}|[0-9]{17})$';
    static EMAIL_REGEX = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$';
    static TIN_REGEX = /^([0-9]{10}|[0-9]{11}|[0-9]{12})$/;
    static BIRTH_REG_REGEX = '^([0-9]{17})$';
    static PASSPORT_NO_REGEX = '^([A-Z]{1,4}[0-9]{6,15})$';
    static POST_CODE_REGEX = /^[1-9][0-9]{3}$/;
    static HEIGHT_REGEX = /^(?:[1-8]\.\d{1,2}|[1-9])$/;
    static BENGALI_VALIDATOR_REGEX = /^([\u0980-\u09FF]+(\s[\u0980-\u09FF]+)*)?$/;
    static ENGLISH_VALIDATOR_REGEX = /^[a-z ,.'-]+$/i;
    static WEB_URL_VALIDATOR = /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
    static GPA_SCALE_4 = /^(?:[1-3]\.\d{1,2}|[1-4])$/;
    static GPA_SCALE_5 = /^(?:[1-4]\.\d{1,2}|[1-5])$/;
    static PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$-/:-?{-~!"^_@`\[\]]).{8,}$/;
}
export class HttpStatus {
    static SUCCESS = [200];
    static INFO = [201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308];
    static WARN = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451];
    static ERROR = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];
}
