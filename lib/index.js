"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape_username = void 0;
const doge_config_1 = require("doge-config");
function escape_username(username) {
    return username.replace(/[^a-z0-9_]/gi, '');
}
exports.escape_username = escape_username;
class Coolness {
    constructor() {
        this.__data = doge_config_1.getConfig('Coolness');
    }
    howCool(user) {
        return +this.__data.__has(user) && this.__data.__getNumber(user);
    }
    makeCool(whoIsMakingCool, whoIsBeingMadeCool) {
        whoIsMakingCool = escape_username(whoIsMakingCool);
        whoIsBeingMadeCool = escape_username(whoIsBeingMadeCool);
        if (this.howCool(whoIsMakingCool) > (this.howCool(whoIsBeingMadeCool) << 1)) {
            this.__data.__set(whoIsBeingMadeCool, this.howCool(whoIsMakingCool) * Math.ceil(this.howCool(whoIsMakingCool) * 2 / 3));
            return true;
        }
        else
            return false;
    }
    makeUncool(whoIsMakingUncool, whoIsBeingMadeUncool) {
        whoIsMakingUncool = escape_username(whoIsMakingUncool);
        whoIsBeingMadeUncool = escape_username(whoIsBeingMadeUncool);
        if (this.howCool(whoIsMakingUncool) > (this.howCool(whoIsBeingMadeUncool) + 3)) {
            this.__data.__set(whoIsBeingMadeUncool, -1);
            return true;
        }
        else
            return false;
    }
    setCoolness(person, coolness) {
        person = escape_username(person);
        this.__data.__set(person, Math.ceil(coolness));
        return true;
    }
}
exports.default = Coolness;
module.exports = Coolness;
Object.assign(Coolness, {
    default: Coolness,
    Coolness,
    escape_username,
});
