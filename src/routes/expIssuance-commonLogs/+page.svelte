<script>
    import { urls } from "../../lib/Common/Rendering_Data/urls.js";
    import {_fetch_data } from "../../lib/API/GET";
    import Table from "../../lib/Common/Components/ActivityLog_Table.svelte";
    import {columns} from "../../lib/Common/Rendering_Data/column_headers"
</script>

<div class="w-[95%] mx-auto pt-[60px]">
    <h1 class="mt-10 text-center text-4xl mb-4">Exp Issuance Common Log</h1>
    <Table 
        columns={columns.commonLogs}
        fetchData={() => _fetch_data(urls.expIssuanceUrl)}
        uniqueKey="invoice_no"
    />
</div>
