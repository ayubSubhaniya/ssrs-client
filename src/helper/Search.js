import _ from "lodash"

export function findById(array,id) {
    return _.find(array,(obj) => obj._id == id)
}
