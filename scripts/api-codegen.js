import { generateApi } from 'swagger-typescript-api';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

generateApi({
  input: path.resolve(__dirname, 'swagger.yaml'),
  output: path.resolve(__dirname, '../src/app/api'),
  name: 'Api',
  extractRequestParams: true,
  fileName: 'codegen',
  apiClassName: 'Api',
  moduleNameIndex: 1,
  extractEnums: true,
  singleHttpClient: true,
  unwrapResponseData: true,
});