<script>
    import { onMount } from 'svelte';
    export let drawerId = "my-drawer";
    let isDropdownOpen = false;
  
    const toggleDropdown = () => {
      isDropdownOpen = !isDropdownOpen;
    };
  
    // Close the dropdown if the user clicks outside of it
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown') === null) {
        isDropdownOpen = false;
      }
    };
  
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
  </script>
  
  <div class="drawer">
    <input id={drawerId} type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for={drawerId} class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </label>
    </div>
    <div class="drawer-side">
      <label for={drawerId} aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a href="/">Homepage</a></li>
        
        <li  class="dropdown" on:click={toggleDropdown}>
          <a class="flex justify-between items-center cursor-pointer">
            Services 
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </a>
          {#if isDropdownOpen}
            <ul class="p-2 bg-base-200 mt-2 transition-all duration-300">
              <li><a href="/exp-issuance">Exp Issuance</a></li>
              <li><a href="/exp-download">Exp Download</a></li>
              <li><a href="/exp-download">FCR</a></li>
              <li><a href="/exp-download">Booking</a></li>
              <li><a href="/exp-download">Po Extractor</a></li>
            </ul>
          {/if}
        </li>
        <li><a href="/login">Log In</a></li>
      </ul>
    </div>
  </div>
  
  <style>
    .dropdown > ul {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    }
    .dropdown:hover > ul,
    .dropdown > ul.svelte-1i98qgg {
      opacity: 1;
      max-height: 200px; /* Adjust as needed */
      overflow: visible;
    }
  </style>
  