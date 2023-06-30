"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexConstants = void 0;
exports.regexConstants = {
    EMAIL: /^(?:[0-9a-zA-z.!!@#$%^&*+={}'/-]+@[a-zA-Z]{1}[a-zA-Z]+[/.][a-zA-Z]{2,4}|)$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};
