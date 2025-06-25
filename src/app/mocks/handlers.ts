import { delay, http, HttpResponse } from 'msw';
import { API_URL, TON_API_URL } from 'shared/constants';
import { balances } from './json/balances';
import DAOS from './json/DAOS.json';
import { holders } from './json/holders';
import { jettons } from './json/jettons';
import { nfts } from './json/nfts';
import PROPOSALS from './json/PROPOSALS.json';
import RATES from './json/RATES.json';
import { votes } from './json/votes';

export const handlers = [
	http.all('*', async () => {
		await delay(Math.random() * 500 + 500);
	}),

	http.post(`${API_URL}/auth`, async () => {
		await delay(Math.random() * 500 + 1000);
		return HttpResponse.json({
			auth_token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMDo1OWYwNzJmYWYyZTY4MTVjZTljM2E4ODg4Y2M3M2IzNzc4YTMxODA5M2IyM2FhOTQyNGRiYzgyZTIxMjA5NjZhIiwiZXhwIjoxNzUzNTU0MDg3LCJzdWIiOiJhdXRoIn0.R39rDwjPQlE9_Bshbew2HvMIN6j65gFO591NGmHFssQ',
		});
	}),

	http.get(`${API_URL}/api/v1/daos`, ({ request }) => {
		const url = new URL(request.url);
		const search = url.searchParams.get('search');
		const searchedDaos = {
			total: DAOS.total,
			items: [...DAOS.items.filter((dao) => (search ? dao.name.includes(search) : true))],
		};

		return HttpResponse.json(searchedDaos);
	}),

	http.get<{ id: string }>(`${API_URL}/api/v1/daos/:id`, ({ params }) => {
		const { id } = params;
		const dao = DAOS.items.find((dao) => dao.address === id);
		if (dao) {
			return HttpResponse.json(dao);
		} else {
			return HttpResponse.error();
		}
	}),

	http.get(`${API_URL}/api/v1/proposals`, ({ request }) => {
		const url = new URL(request.url);
		const search = url.searchParams.get('search');
		const filter = url.searchParams.get('filter');
		const filteredProposals = {
			total: PROPOSALS.items.filter((proposal) => (filter ? proposal.status === filter : true)).length,
			items: [...PROPOSALS.items.filter((proposal) => (filter ? proposal.status === filter : true))],
		};
		const searchedProposals = {
			total: filteredProposals.items.filter((proposal) => (search ? proposal.name.includes(search) : true)).length,
			items: [...filteredProposals.items.filter((proposal) => (search ? proposal.name.includes(search) : true))],
		};
		return HttpResponse.json(searchedProposals);
	}),

	http.get<{ daoId: string; proposalId: string }>(
		`${API_URL}/api/v1/daos/:daoId/proposals/:proposalId/votes`,
		({ params }) => {
			const { proposalId } = params;
			const voteList = Object.entries(votes).find((vote) => vote[0] === proposalId)?.[1];

			return HttpResponse.json(voteList);
		}
	),

	http.get<{ daoId: string }>(`${API_URL}/api/v1/daos/:daoId/holders`, ({ params }) => {
		const { daoId } = params;
		const holderList = Object.entries(holders).find((vote) => vote[0] === daoId)?.[1];

		return HttpResponse.json(holderList);
	}),

	http.get<{ daoId: string }>(`${API_URL}/api/v1/daos/:daoId/holders`, ({ params }) => {
		const { daoId } = params;
		const holderList = Object.entries(holders).find((vote) => vote[0] === daoId)?.[1];

		return HttpResponse.json(holderList);
	}),

	http.get<{ address: string }>(`${TON_API_URL}/v2/accounts/:address/jettons`, ({ params }) => {
		const { address } = params;
		const jettonList = Object.entries(jettons).find((vote) => vote[0] === address)?.[1];

		return HttpResponse.json(
			jettonList ?? {
				balances: [],
			}
		);
	}),

	http.get<{ address: string }>(`${TON_API_URL}/v2/accounts/:address`, ({ params }) => {
		const { address } = params;
		const balance = Object.entries(balances).find((vote) => vote[0] === address)?.[1];

		return HttpResponse.json(balance);
	}),

	http.get<{ address: string }>(`${TON_API_URL}/v2/accounts/:address/nfts`, ({ params }) => {
		const { address } = params;
		const nftList = Object.entries(nfts).find((vote) => vote[0] === address)?.[1];

		return HttpResponse.json(nftList ?? { nft_items: [] });
	}),

	http.get(`${TON_API_URL}/v2/rates`, () => {
		return HttpResponse.json(RATES);
	}),
];
