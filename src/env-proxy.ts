export class ProcessEnvParseError extends Error {
	constructor(name: string, toBe: string) {
		super(`Expected environment variable ${name} to be ${toBe}.`);
		Object.setPrototypeOf(this, ProcessEnvParseError.prototype);
	}
}

interface ProcessEnv<T> {
	[key: string]: T | null;
}

type ProcessEnvRequired<T> = Required<ProcessEnv<T>>;

const string = new Proxy(process.env, {
	get(t, prop: string) {
		const v = t[prop];
		if (!v) return undefined;
		else return v;
	}
}) as Record<string, string | undefined>;

const int = new Proxy(process.env, {
	get(t, prop: string) {
		const v = t[prop];

		if (v === undefined) return undefined;

		const parsed = parseInt(v);

		if (isNaN(parsed)) throw new ProcessEnvParseError(prop, 'an integer');

		return parsed;
	}
}) as Record<string, number | undefined>;

const bool = new Proxy(process.env, {
	get(t, prop: string) {
		const v = t[prop];

		if (v === undefined) return v;
		else if (['true', '1'].includes(v.trim().toLowerCase())) return true;
		else if (['false', '0'].includes(v.trim().toLowerCase())) return false;
		else if (v) throw new ProcessEnvParseError(prop, 'a boolean');
		else return undefined;
	}
}) as Record<string, boolean | undefined>;

const requiredString = new Proxy(string, {
	get(t, prop: string) {
		const val = t[prop];
		if (!val) throw new ProcessEnvParseError(prop, 'defined');
		else return val;
	}
}) as Record<string, string>;

const requiredInt = new Proxy(int, {
	get(t, prop: string) {
		const val = t[prop];
		if (val === undefined) throw new ProcessEnvParseError(prop, 'defined');
		else return val;
	}
}) as Record<string, number>;

const requiredBool = new Proxy(bool, {
	get(t, prop: string) {
		const val = t[prop];
		if (val === undefined) throw new ProcessEnvParseError(prop, 'defined');
		else return val;
	}
}) as Record<string, boolean>;

const required = {
	string: requiredString,
	int: requiredInt,
	bool: requiredBool
};

export default { string, int, bool, required };
