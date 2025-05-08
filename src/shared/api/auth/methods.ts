import { api } from 'app/api';
import { AuthToken, Payload, Proof } from 'app/api/codegen';

export const login = async (address: string, proof: Proof): Promise<AuthToken | void> => {
	try {
		return await api.v1.authCheckProof({ address, proof }, { headers: { 'Content-Type': 'application/json' } });
	} catch {}
};

export const getPayload = async (): Promise<Payload | void> => {
	try {
		return await api.v1.authGetPayload();
	} catch {}
};

export default { login, getPayload };
