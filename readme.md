# env-proxy

uses _proxies_ to simplify reading from process.env in node.

# example

```ts
import { ConnectionOptions } from '@mikro-orm/core';

import env from 'env-proxy';

let connection: ConnectionOptions;

// typed as boolean | undefined
const { VERCEL } = env.bool;

if (VERCEL) {
	// typed as string, will throw if not defined
	const {
		VERCEL_GIT_COMMIT_REF: branch,
		VERCEL_ENV: stage,
		DB_HOST: host,
		DB_USER: user,
		DB_PASSWORD: password
	} = env.required.string;

	// typed as number, parsed with parseInt, will throw if undefined or NaN
	const { DB_PORT: port } = env.required.int;

	let dbName: string;

	if (stage === 'production') dbName = 'myapp-production';
	else if (stage === 'preview') dbName = `myapp-preview-${branch}`;
	else if (stage === 'development') dbName = `myapp-dev-${branch}`;
	else throw new Error(`Unrecognized vercel deployment stage ${stage}`);

	connection = { host, port, user, password, dbName };
} else {
	const { DB_HOST: host = 'localhost' } = env.string;
	const { DB_USER: user, DB_PASSWORD: password } = env.required.string;

	connection = {
		dbName: 'myapp',
		host,
		user,
		password
	};
}
```
