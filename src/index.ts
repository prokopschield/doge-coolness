import {
	getConfig,
} from 'doge-config';

/**
 * Filter non-username characters from username
 * @param {string} username Un-escaped username
 * @returns {string} The filtered username
 */
export function escape_username (username: string): string {
	return username.replace(/[^a-z0-9_]/gi, '');
}

export default class Coolness {
	/**
	 * The actual JSON object.
	 * You can interact with it directly,
	 * if you for whatever reason want to.
	 */
	__data = getConfig('Coolness');

	/**
	 * howCool is a user?
	 * @param {string} user User - who's coolness you're querying
	 * @returns {number} Coolness value
	 */
	howCool (user: string): number {
		return +this.__data.__has(user) && this.__data.__getNumber(user);
	}

	/**
	 * One person is making another user cool
	 * @param {string} whoIsMakingCool Who is making the other person cool?
	 * @param {string} whoIsBeingMadeCool Who is being made cool?
	 * @returns {boolean} Return true if the user was made cool, false otherwise.
	 */
	makeCool (whoIsMakingCool: string, whoIsBeingMadeCool: string): boolean {
		whoIsMakingCool = escape_username(whoIsMakingCool);
		whoIsBeingMadeCool = escape_username(whoIsBeingMadeCool);

		if (this.howCool(whoIsMakingCool) > ( this.howCool(whoIsBeingMadeCool) << 1 ) ) {
			this.__data.__set(whoIsBeingMadeCool, this.howCool(whoIsMakingCool) * Math.ceil( this.howCool(whoIsMakingCool) * 2 / 3 ));
			return true;
		} else return false;
	}

	/**
	 * One person is making another user uncool
	 * @param {string} whoIsMakingUncool Who is making the other person uncool?
	 * @param {string} whoIsBeingMadeUncool Who is being made uncool?
	 * @returns {boolean} Returns true if the user was made uncool, false otherwise.
	 */
	makeUncool (whoIsMakingUncool: string, whoIsBeingMadeUncool: string): boolean {
		whoIsMakingUncool = escape_username(whoIsMakingUncool);
		whoIsBeingMadeUncool = escape_username(whoIsBeingMadeUncool);

		if (this.howCool(whoIsMakingUncool) > ( this.howCool(whoIsBeingMadeUncool) + 3 ) ) {
			this.__data.__set(whoIsBeingMadeUncool, -1);
			return true;
		} else return false;
	}

	/**
	 * 
	 * @param {string} person The person who's coolness you're setting
	 * @param {number} coolness how cool you want the person to be
	 * @returns {true}
	 */
	setCoolness (person: string, coolness: number): true {
		person = escape_username(person);
		this.__data.__set(person, Math.ceil(coolness));
		return true;
	}
}

module.exports = Coolness;

Object.assign(Coolness, {
	default: Coolness,
	Coolness,
	escape_username,
});
