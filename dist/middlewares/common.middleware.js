"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
class CommonMiddleware {
    isIdValid(req, res, next) {
        try {
            const { id } = req.params;
            if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                throw new errors_1.ApiError("ID is not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.commonMiddleware = new CommonMiddleware();
