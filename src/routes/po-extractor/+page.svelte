<script>
    import InputFile from '../../lib/Common/Components/FileInput.svelte';
</script>

<div class="flex justify-center items-center h-screen">
    <div class="w-1/2">
        <h1 class="text-center text-4xl mb-4">PO Extractor</h1>
        <InputFile fileTypeDescription="Invoice PDFs or ZIP files" allowedFileTypes=".pdf,.PDF,.zip" />
    </div>
</div>
