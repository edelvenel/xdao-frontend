import { useApp } from './useApp';
import { useAuth } from './useAuth';
import { useDaos } from './useDaos';
import { useFormType } from './useFormType';
import { useMe } from './useMe';
import { useNfts } from './useNfts';
import { useWallet } from './useWallet';
import { useTelegramData } from './useTelegramData';

export const store = {
	useApp,
	useAuth,
	useMe,
	useWallet,
	useFormType,
	useDaos,
	useNfts,
	useTelegramData,
};
