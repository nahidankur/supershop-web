/* eslint-disable @typescript-eslint/naming-convention */
export class APIEndpoint {
    static GET_PRODUCT_LIST = '/product/get-list';
    static GET_CAROUSEL_PRODUCT_LIST = '/product/get-carousel-list';
    static GET_PRODUCT_DETAILS = '/product/get-details';

        // FILE MANAGEMENT

    static UPLOAD = '/file/upload';
    static DOWNLOAD = '/file/download';
    static DELETE = '/file/delete';

    // security
    static SIGN_IN = '/signin';
    static REGISTRATION = '/registration';
    static SIGN_OUT = '/signout';
}
