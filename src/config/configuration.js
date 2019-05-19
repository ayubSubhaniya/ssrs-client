let domainUrl = "";
if (process.env.NODE_ENV === "development") {
    // domainUrl = "https://ssrs-daiict-api.herokuapp.com"
    domainUrl = "http://localhost:3001"
}else{
    domainUrl = "https://ssrs.daiict.ac.in:8443";
}
export {domainUrl};

export const errorMessages = {
    internalServerError: "Internal server error. Please try again later!",
    serverTimeout: "Server timeout. Please try again later!",
    userAlreadyExist: "User Already Exist!",
    userNotExist: "User don't Exist!",
    incorrectUserNameOrPassword: "Incorrect username/password",
    somethingsWrong: "Something's wrong. Please try again later!",
    forbidden: "You don't have access to requested resource!",
    notFound: "Not found!",
    validationError: "Fill both ID and Password",
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

export const modalMessages = {
    collectionTypeSwitch: "Are you sure enough to active/inactive this collection type?",
    collectionTypeDelete: "Are you sure enough to delete this collection type?",
    parameterSwitch: "Are you sure enough to active/inactive this parameter?",
    parameterDelete: "Are you sure enough to delete this parameter?",
    serviceSwitch: "Are you sure enough to active/inactive this service?",
    serviceDelete: "Are you sure enough to delete this service?",
    userListSwitch: "Are you sure enough to active/inactive this user?",
    newsOrNotificationDelete: "Are you sure to delete this item?",
    refundCart: "Are you sure to refund this cart?"
}

export const orderStatus = {
    failed: 0,
    invalidOrder: 10,
    unplaced: 20,
    placed: 30,
    processing: 40,
    ready: 50,
    onHold: 60,
    refunded: 70,
    completed: 80,
    cancelled: 90,
};
