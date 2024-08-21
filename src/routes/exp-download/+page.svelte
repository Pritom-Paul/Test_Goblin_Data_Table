<script>
    import { urls } from '../../lib/Common/Rendering_Data/urls.js';
	import { _fetch_data } from '../../lib/API/GET';
    import Table from "../../lib/Common/Components/Table.svelte";
    import {columns} from "../../lib/Common/Rendering_Data/column_headers"
</script>

<div class="w-[90%] mx-auto pt-[60px]">
    <h1 class="mt-10 text-center text-4xl mb-4">Exp Download</h1>
    <Table 
        columns={columns.expDownload}
        fetchData={() => _fetch_data(urls.expDownloadUrl)}
        uniqueKey="exp_serial"  
    />
</div>





























<!-- 


    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        <input type="checkbox" class="form-checkbox" />
                    </th>
                    {#each _expDownload_columns as column}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            {column.header}
                        </th>
                    {/each}
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {#each filteredData as item}
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                            <input type="checkbox" class="form-checkbox" />
                        </td>
                        {#each _expDownload_columns as column}
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                {item[column.key]}
                            </td>
                        {/each}
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                            <button class="text-blue-600 hover:underline">Edit</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div> 

</div> -->