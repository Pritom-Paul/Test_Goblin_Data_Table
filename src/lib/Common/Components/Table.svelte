<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Button from "./Button.svelte";
    
    export let columns = [];
    export let fetchData;
    export let uniqueKey = 'invoice_no';  // Add this line
    export let commonLog_url = "";

    let data = writable([]);
    let searchQuery = writable('');
    let checkedItems = writable({});
    let selectAll = writable(false);
    let sortColumn = writable(null);
    let sortOrder = writable('asc');
    let editingRow = writable(null);

    onMount(async () => {
        const fetchedData = await fetchData();
        fetchedData.forEach((item, index) => {
        item.originalIndex = index;  // Add original index
    });
        data.set(fetchedData);
        let initialCheckedItems = {};
        fetchedData.forEach(item => {
            initialCheckedItems[item[uniqueKey]] = false;  // Update this line
        });
        checkedItems.set(initialCheckedItems);
    });

    // Function to handle search
    function _handleSearch(event) {
        searchQuery.set(event.target.value.toLowerCase());
    }

    // Function to handle "select all" checkbox change
    function _handleSelectAll(event) {
        const isChecked = event.target.checked;
        selectAll.set(isChecked);
        checkedItems.update(items => {
            let updatedItems = { ...items };
            Object.keys(updatedItems).forEach(key => {
                updatedItems[key] = isChecked;
            });
            return updatedItems;
        });
    }

    // Function to handle individual checkbox change
    function _handleCheckboxChange(key) {  // Change parameter name
        checkedItems.update(items => {
            let updatedItems = { ...items };
            updatedItems[key] = !updatedItems[key];
            selectAll.set(Object.values(updatedItems).every(item => item));
            return updatedItems;
        });
    }

     // Function to handle row editing
     function _handleEdit(key) {
        editingRow.set(key);
    }

     // Function to handle cancel
     function _handleCancel() {
        editingRow.set(null);
    }

    // Function to handle save
    function _handleSave(key) {
        // Logic to save changes (e.g., send to backend)
        editingRow.set(null);
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
        <!-- Group for buttons on the left -->
        <div class="flex space-x-4">
            <Button initialText="Start" />
            <a href={commonLog_url}>
                <Button initialText="View Logs" />
            </a>
            <!-- <Button initialText="Delete" /> -->
        </div>
        
        <!-- Search bar on the right -->
        <input
            type="text"
            class="border rounded px-4 py-2 text-gray-900 dark:text-gray-400"
            placeholder="Search..."
            on:input={_handleSearch}
        />
    </div>  
    
    
    <!-- <div class="overflow-x-auto" style="max-height: 600px;"> -->
    <div class="overflow-x:scroll">
        <table class="min-w-min divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-300 dark:bg-gray-800">
                <tr>
                    <th class="px-2 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" class="form-checkbox" on:change={_handleSelectAll} bind:checked={$selectAll} />
                    </th>
                    {#each columns as column}
                        <th 
                            class="px-2 py-2 text-center text-lg font-medium text-grey-900 uppercase tracking-wider cursor-pointer dark:text-gray-300"
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
                        <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                            <input type="checkbox" class="form-checkbox" on:change={() => _handleCheckboxChange(item[uniqueKey])} bind:checked={$checkedItems[item[uniqueKey]]} />
                        </td>
                        {#each columns as column}
                        {#if $editingRow === item[uniqueKey] && column.key !== 'status' && column.key !== 'view_logs' && column.key !== 'serial_no' && column.key !== 'download'} 
                            {#if column.key === 'edit'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <button class="text-green-600 hover:underline" on:click={() => _handleSave(item[uniqueKey])}>Save</button>
                                    <button class="text-red-600 hover:underline ml-2" on:click={_handleCancel}>Cancel</button>
                                </td>
                            {:else}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <input type="text" class="border rounded px-2 py-1 text-gray-900 dark:text-gray-400" bind:value={item[column.key]} />
                                </td>
                            {/if}
                        {:else}
                            {#if column.key === 'edit'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <button class="text-blue-600 hover:underline" on:click={() => _handleEdit(item[uniqueKey])}>Edit</button>
                                </td>
                            {:else if column.key === 'download'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <button class="text-blue-600 hover:underline">Download</button>
                                </td>
                            {:else if column.key === 'view_logs'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <button class="text-blue-600 hover:underline">View Logs</button>
                                </td>
                            {:else if column.key === 'status'}
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium" style={item.status === 'completed' ? 'color: green' : item.status === 'pending' ? 'color: orange' : item.status === 'rejected' ? 'color: red' : item.status === 'running' ? 'color: blue' : 'color: gray'}>
                                    {item.status === 'completed' ? 'Completed' : item.status === 'pending' ? 'Pending' : item.status === 'rejected' ? 'Rejected' : item.status === 'running' ? 'Running' : 'Error'}
                                </td>
                            {:else if column.key === 'serial_no'}
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
                        {/if}
                    {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
    

