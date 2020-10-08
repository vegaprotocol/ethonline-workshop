<script>
	import { tradeStream } from './stores';
	const trades = tradeStream();
</script>

<main>
	<h1>ETHOnline Trade Streamer</h1>
	<ul>
		{#each $trades.reverse() as trade (trade.id)}
		<li>{trade.size} @ {trade.price} {trade.seller.id} ➡ {trade.buyer.id}</li>
		{/each}
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>