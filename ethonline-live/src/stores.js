import { readable } from 'svelte/store';
import { SubscriptionClient } from 'subscriptions-transport-ws';


const GRAPHQL_ENDPOINT = 'lb.testnet.vega.xyz';

const TRADES_QUERY = 'subscription { trades { price size buyer { id } seller { id } id } }';
const MAX_TRADES = 256;

export function tradeStream() {
	return readable([], function start(set) {
		
		let trades = [];
		const client = new SubscriptionClient(GRAPHQL_ENDPOINT, { reconnect: true });

		const req = client.request({ query: TRADES_QUERY }).subscribe({
			next(res) {
				if (res && res.data && res.data.trades) {
					console.log(`Received ${res.data.trades.length} trades`);
					trades = trades.concat(res.data.trades).slice(-1 * MAX_TRADES);
					set(trades);
				}
			},
			error(e) {
				console.log('GraphQL error:', e);
			},
			complete() {
				console.log('GraphQL request finished.');
			}
		})
	});
}
