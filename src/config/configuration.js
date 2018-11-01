// export const domainUrl = "https://10.100.81.42:3001";
export const domainUrl = "https://ssrs-daiict-api.herokuapp.com";
//export const domainUrl = "http://localhost:3001";
export const errorMessages = {
    internalServerError: "Internal server error. Please try again later!",
    serverTimeout: "Server timeout. Please try again later!",
    userAlreadyExist: "User Already Exist!",
    userNotExist: "User don't Exist!",
    incorrectUserNameOrPassword: "Incorrect username/password",
    somethingsWrong: "Something's wrong. Please try again later!",
    forbidden: "You don't have access to requested resource!",
    notFound: "Not found!",
    noCollectionTypes: "No collection type information provided. Please select collection type and provide information."
};

export const infoMessages = {
    verificationLinkSent: "Verification link sent. Please check you mail!"
};

export const cartStatus: {
        invalid: 10,
        unplaced: 20,
        paymentFailed: 23,
        processingPayment: 25,
        placed: 30,
        paymentComplete: 40,
        processing: 50,
        readyToDeliver: 60,
        readyToPickup: 70,
        completed: 80,
        onHold: 90,
        cancelled: 100,
        refunded: 110,
    };
export const orderStatus = {
    failed: 0,
    invalidOrder: 10,
    unplaced: 20,
    placed: 30,
    processing: 40,
    ready: 50,
    completed: 60,
    onHold: 70,
    cancelled: 80,
    refunded: 90,
};
