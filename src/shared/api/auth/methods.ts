import { api } from 'app/api';
import { AuthToken, Proof } from 'app/api/codegen';

export const login = async (address: string, proof: Proof): Promise<AuthToken | void> => {
	try {
		return await api.v1.authCheckProof({ address, proof });
	} catch {}
};

export default { login };
