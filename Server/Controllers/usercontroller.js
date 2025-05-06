"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
var getUser = function (req, res) {
    var userId = req.params.id;
    res.send("User ID requested: ".concat(userId));
};
exports.getUser = getUser;
