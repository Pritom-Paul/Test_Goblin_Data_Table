<script>
    import { writable } from 'svelte/store';

    export let initialText = ''; // Initial text to be displayed on the button

    // A writable store to handle text changes dynamically
    let text = writable(initialText);

    // Define button styles based on types
    const buttonStyles = {
    "Start": "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow rounded-full text-xl px-6 py-3 text-center",
    "Stop": "bg-gradient-to-r from-red-400 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-xl px-6 py-3 text-center",
    "View Logs": "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-xl px-6 py-3 text-center",
    "Delete": "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-xl px-6 py-3 text-center"
    };


    // Function to get the appropriate class based on the button type
    function getButtonClass(type) {
        return buttonStyles[type] || 'default-button-class'; // Default class if type is not found
    }

    // Handling button click
    function handleClick() {
        text.update(currentText => currentText === "Start" ? "Stop" : "Start"); // Toggle between "Start" and "Stop"
    }
</script>

<button type="button" on:click={handleClick} class={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-150 ease-in-out ${getButtonClass($text)}`}>
    {$text}
</button>
