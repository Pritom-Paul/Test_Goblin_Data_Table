<script>
    import ServiceCard from '../../lib/Common/Components/ServiceCards.svelte';
    import { cardDetails } from '../../lib/Common/Rendering_Data/service_homepage_data';

    let cards = Object.values(cardDetails); // Converts the cardDetails object into an array of its values
</script>

<div class="w-[90%] mx-auto pt-[60px]">
    <h1 class="mt-10 text-center text-4xl mb-4">Services</h1>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
    {#each cards as card}
        <ServiceCard {card} />
    {/each}
</div>

<style>
    .grid {
        justify-content: center;
        align-items: center;
    }
</style>
