import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useCallback, useRef } from "react";
import { API } from "shared/api";
import { store } from "shared/store";

export const TonProof = () => {
	const firstProofLoading = useRef<boolean>(true);
	const { setToken } = store.useAuth();
	const [tonConnectUI] = useTonConnectUI();

	const recreateProofPayload = useCallback(async () => {
		if (firstProofLoading.current) {
			tonConnectUI.setConnectRequestParameters({ state: 'loading' });
			firstProofLoading.current = false;
		}

		const payload = await API.Auth.getPayload();

		if (payload) {
			tonConnectUI.setConnectRequestParameters({ state: 'ready', value: { tonProof: payload.payload } });
		} else {
			tonConnectUI.setConnectRequestParameters(null);
		}
	}, [tonConnectUI, firstProofLoading]);

    useEffect(() => {
        recreateProofPayload();
    }, [recreateProofPayload]);

	useEffect(() =>
		tonConnectUI.onStatusChange(async w => {
			if (!w) {
				return;
			}

			if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
                const proof = w.connectItems.tonProof.proof;
				let token = await API.Auth.login(w.account.address, { timestamp: proof.timestamp, domain: proof.domain.value, signature: proof.signature, payload: proof.payload, state_init: w.account.walletStateInit });
        if (token) {
          setToken(token.auth_token);
        }
			}

		}), [tonConnectUI]);



  return null;
};