<script>
    export let card; // Accepts card details as a prop
    import { onMount } from 'svelte';

    let isLoggedIn = true;

    // Check for token in local storage when the component is mounted
    // onMount(() => {
    //     if (typeof localStorage !== 'undefined') {
    //         isLoggedIn = !!localStorage.getItem('access_token');
    //     }
    // });

    // Function to handle the "Enter" button click
    function handleEnterClick(event) {
        if (!isLoggedIn) {
            event.preventDefault();
            window.location.href = '/login';
        }
    }
</script>

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <!-- <img class="rounded-t-lg" src={card.imageUrl} alt={card.title} /> -->
    <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
        <a href={card.url} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={handleEnterClick}>
            Enter
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

<style>
    .max-w-sm {
        transition: transform .3s ease-in-out;
    }

    .max-w-sm:hover {
        transform: scale(1.03);
    }
</style>
