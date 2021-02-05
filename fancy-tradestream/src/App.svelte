<script>
	import { recentTrades } from './stores';
	import TradeCard from './TradeCard.svelte';

	let nodeUrl = 'lb.testnet.vega.xyz';
	let samplePercentage = 100.0;
	const trades = recentTrades(tx => Math.random() < (samplePercentage / 100), `wss://${nodeUrl}/query`);
</script>

<style>
	div {
		margin: 0 auto;
		width: 22em;
		max-width: 22em;
		color: gray;
	}
	input {
		background-color: #333;
		padding: 0.3em;
		color: lightgoldenrodyellow;
		border: 1px solid darkblue;
		font-size: 1em;
		width: 4em;
	}
</style>

<main>
	<div id="controls">
		<p><label for="samplePercentage">Sample <input type="number" max="100" min="0" name="samplePercentage" bind:value={samplePercentage}>% of trades</label></p>
	</div>
	{#each ($trades || []).slice().reverse() as tx (tx.id)}
		<TradeCard {tx} />
	{/each}
</main>
