<script>
    import { urls } from '../../lib/Common/Rendering_Data/urls.js';
	import { _fetch_data } from '../../lib/API/GET';
    import Table from "../../lib/Common/Components/Table.svelte";
    import {columns} from "../../lib/Common/Rendering_Data/column_headers"
</script>

<div class="w-[90%] mx-auto pt-[60px]">
    <h1 class="mt-10 text-center text-4xl mb-4">FCR</h1>
    <Table 
        columns={columns.fcr}
        fetchData={() => _fetch_data(urls.fcrUrl)}
        uniqueKey="invoice_no"  
    />
</div>
