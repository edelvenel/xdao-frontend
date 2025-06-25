import { App } from 'app/App';
import { createRoot } from 'react-dom/client';

async function enableMocking() {
	// return;
	if (!import.meta.env.DEV) {
		return;
	}

	const { worker } = await import('./app/mocks/browser');

	return worker.start();
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<App />));
