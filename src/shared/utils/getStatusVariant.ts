export const getStatusVariant = (status: number): 'yellow' | 'blue' => {
	switch (status) {
		case 1: {
			// active
			return 'yellow';
		}
		case 2: {
			// pending
			return 'blue';
		}

		case 3: {
			// executed
			return 'blue';
		}

		case 4: {
			// rejected
			return 'blue';
		}
		default:
			return 'yellow';
	}
};
