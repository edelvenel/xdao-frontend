import { generateApi } from 'swagger-typescript-api';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

generateApi({
	input: path.resolve(__dirname, 'tg-swagger.yaml'),
	output: path.resolve(__dirname, '../src/app/api'),
	name: 'TgDataApi',
	extractRequestParams: true,
	fileName: 'tg-data-codegen',
	apiClassName: 'TgDataApi',
	moduleNameIndex: 1,
	extractEnums: true,
	singleHttpClient: true,
	unwrapResponseData: true,
});
