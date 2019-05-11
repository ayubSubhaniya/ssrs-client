export const cartStatus = {
    10: 'invalid',
    20: 'unplaced',
    30: 'paymentFailed',
    40: "processingPayment",
    50: 'placed',
    60: 'paymentComplete',
    70: 'processing',
    80: 'readyToDeliver',
    90: 'readyToPickup',
    100: 'onHold',
    120: 'completed',
    125: 'refunded',
    130: 'cancelled',
    0: 'Loading...'
}

export const rcartStatus = {
    invalid: 10,
    unplaced: 20,
    paymentFailed: 30,
    processingPayment: 40,
    placed: 50,
    paymentComplete: 60,
    processing: 70,
    readyToDeliver: 80,
    readyToPickup: 90,
    onHold: 100,
    completed: 120,
    refunded: 125,
    cancelled: 130,
}

export const orderStatus = {
    0: "paymentFailed",
    10: "invalidOrder",
    20: "unplaced",
    30: "placed",
    40: "processing",
    50: "ready",
    60: "onHold",
    80: "completed",
    85: "refunded",
    90: "cancelled"
}

export const rorderStatus = {
    paymentFailed: 0,
    invalidOrder: 10,
    unplaced: 20,
    placed: 30,
    processing: 40,
    ready: 50,
    onHold: 60,
    completed: 80,
    refunded: 85,
    cancelled: 90,
}

export const rcollectionStatus = {
    paymentFailed: 0,
    pendingPayment: 10,
    processing: 20,
    ready: 30,
    completed: 40,
    cancel: 50
}

