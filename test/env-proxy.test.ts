/* eslint-disable @typescript-eslint/no-unused-vars */

import env, { ProcessEnvParseError } from '../src/env-proxy';

beforeEach(() => {
	Object.keys(process.env).forEach(key => {
		delete process.env[key];
	});
});

describe('strings', () => {
	test('defined', () => {
		process.env.FOO = 'bar';
		const { FOO } = env.string;
		expect(FOO).toEqual('bar');
	});

	test('undefined', () => {
		const { FOO } = env.string;
		expect(FOO).toBeUndefined();
	});

	describe('required', () => {
		test('defined', () => {
			process.env.FOO = 'bar';
			const { FOO } = env.required.string;
			expect(FOO).toEqual('bar');
		});

		test('undefined', () => {
			expect(() => {
				const { FOO } = env.required.string;
			}).toThrowError(ProcessEnvParseError);
		});
	});
});

describe('bools', () => {
	test(`'true'`, () => {
		process.env.FOO = 'true';
		const { FOO } = env.bool;
		expect(FOO).toEqual(true);
	});

	test(`'false'`, () => {
		process.env.FOO = 'false';
		const { FOO } = env.bool;
		expect(FOO).toEqual(false);
	});

	test(`'1`, () => {
		process.env.FOO = '1';
		const { FOO } = env.bool;
		expect(FOO).toEqual(true);
	});

	test(`'0'`, () => {
		process.env.FOO = '0';
		const { FOO } = env.bool;
		expect(FOO).toEqual(false);
	});

	test(`'asdf'`, () => {
		process.env.FOO = 'asdf';
		expect(() => {
			const { FOO } = env.bool;
		}).toThrowError(ProcessEnvParseError);
	});

	test('undefined', () => {
		const { FOO } = env.bool;
		expect(FOO).toBeUndefined();
	});

	test('empty string', () => {
		process.env.FOO = '';
		const { FOO } = env.bool;
		expect(FOO).toBeUndefined();
	});

	describe('required', () => {
		test('defined', () => {
			process.env.FOO = '1';
			const { FOO } = env.required.bool;
			expect(FOO).toEqual(true);
		});

		test('undefined', () => {
			expect(() => {
				const { FOO } = env.required.bool;
			}).toThrowError(ProcessEnvParseError);
		});
	});
});

describe('ints', () => {
	test(`'0'`, () => {
		process.env.FOO = '0';
		const { FOO } = env.int;
		expect(FOO).toEqual(0);
	});

	test(`'1'`, () => {
		process.env.FOO = '1';
		const { FOO } = env.int;
		expect(FOO).toEqual(1);
	});

	test('undefined', () => {
		const { FOO } = env.int;
		expect(FOO).toBeUndefined();
	});

	test('asdf', () => {
		process.env.FOO = 'asdf';
		expect(() => {
			const { FOO } = env.int;
		}).toThrowError(ProcessEnvParseError);
	});

	describe('required', () => {
		test(`'0'`, () => {
			process.env.FOO = '0';
			const { FOO } = env.required.int;
			expect(FOO).toEqual(0);
		});

		test(`'1'`, () => {
			process.env.FOO = '1';
			const { FOO } = env.required.int;
			expect(FOO).toEqual(1);
		});

		test('undefined', () => {
			expect(() => {
				const { FOO } = env.required.int;
			}).toThrowError(ProcessEnvParseError);
		});
	});
});

describe('ProcessEnvParseError', () => {
	test('constructor', () => {
		const instance = new ProcessEnvParseError('foo', 'bar');
		expect(instance).toBeInstanceOf(ProcessEnvParseError);
	});
});
