export const shortenAddress = (str: string): string => {
	if (str.length <= 6) {
		return str;
	}
	return str.slice(0, 5) + '…' + str.slice(-5);
};
