// export const domainUrl = "https://10.100.81.42:3001";
export const domainUrl = "https://ssrs.daiict.ac.in:8443";
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
    collectionTypeReq: "Atleast one collection type should be selected.",
    noCollectionTypes: "No collection type information provided. Please select collection type and provide information."
};

export const infoMessages = {
    verificationLinkSent: "Verification link sent. Please check your mail!",
    orderAddedToCart: "Order added to cart!",
    orderPlaced: "Order placed!",
    savedSuccess: "Saved successfully!",
    serviceAdded: "New service created successfully!"
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
