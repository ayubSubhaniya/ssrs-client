import * as HttpStatus from 'http-status-codes'

export const cartError = {
    [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal server error. Please try again later!",
    serverTimeout: "Server timeout. Please try again later!",
    incorrectUserNameOrPassword: "Incorrect username/password",
    somethingsWrong: "Something's wrong. Please try again later!",
    [HttpStatus.FORBIDDEN]: "You don't have access to requested resource!",
    [HttpStatus.NOT_FOUND]: "Not found!",
    noCollectionTypes: "No collection type information provided. Please select collection type and provide information."
};

export const paymentCode = {
    wrong: "PaymentCode Did Not Matched. Please Try Again!"
}

export const collectionCode = {
    wrong: "CollectionCode Did Not Matched. Please Try Again!"
}
