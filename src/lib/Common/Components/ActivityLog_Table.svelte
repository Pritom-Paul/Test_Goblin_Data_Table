<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    
    export let columns = [];
    export let fetchData;

    let data = writable([]);
    let searchQuery = writable('');
    let sortColumn = writable(null);
    let sortOrder = writable('asc');

    onMount(async () => {
        const fetchedData = await fetchData();
        fetchedData.forEach((item, index) => {
            item.originalIndex = index;  // Add original index
        });
        data.set(fetchedData);
    });

    // Function to handle search
    function _handleSearch(event) {
        searchQuery.set(event.target.value.toLowerCase());
    }

    // Function to handle column sorting
    function _handleSort(columnKey) {
        sortColumn.update(current => {
            if (current === columnKey) {
                sortOrder.update(order => (order === 'asc' ? 'desc' : 'asc'));
            } else {
                sortOrder.set('asc');
            }
            return columnKey;
        });
    }

    // Sorting logic update to handle "SL No" column
    $: filteredData = $data
        .filter(item => 
            columns.some(column => 
                item[column.key]?.toString().toLowerCase().includes($searchQuery)
            )
        )
        .sort((a, b) => {
            if (!$sortColumn) return 0;
            let valueA, valueB;

            // If sorting by "SL No" (originalIndex)
            if ($sortColumn === 'serial_no') {
                valueA = a.originalIndex;
                valueB = b.originalIndex;
            } else {
                valueA = a[$sortColumn];
                valueB = b[$sortColumn];
            }

            if (valueA < valueB) return $sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return $sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
</script>

<div class="w-full function-bar">
    <div class="flex justify-between items-center mb-4">
        <!-- Search bar on the left -->
        <input
            type="text"
            class="border rounded px-4 py-2 text-gray-900 dark:text-gray-400"
            placeholder="Search..."
            on:input={_handleSearch}
        />
    </div>  
    
    
    <div class="overflow-x:scroll">
        <table class="min-w-min divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-300 dark:bg-gray-800">
                <tr>
                    {#each columns as column}
                        <th 
                            class="px-4 py-2 text-left text-lg font-medium text-grey-900 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                            on:click={() => _handleSort(column.key)}>
                            {column.header}
                            {#if $sortColumn === column.key}
                                <span>{ $sortOrder === 'asc' ? '▲' : '▼' }</span>
                            {/if}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody class="bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {#each filteredData as item, index}
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
                        {#each columns as column}
                            {#if column.key === 'serial_no'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {item.originalIndex + 1}
                                </td>
                            {:else if item[column.key] === undefined || item[column.key] === null}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    None
                                </td>
                            {:else}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {item[column.key]}
                                </td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
