<script lang="ts">
    import { File } from '@nativescript/core'
    import { Logger } from '../types'
    let logger_json: any;

    export let logger: Logger

    const file = File.fromPath(logger.path)
    file.readText()
        .then((res) => {
            logger_json = JSON.parse(res)
    })
    .catch((error) => {
        console.log(error)
    })
</script>

<page>
    <stackLayout>
        <label text="Title: {logger.title}" class="text-xl" />
        <label textWrap="true">{JSON.stringify(logger_json)}</label>
    </stackLayout>
</page>

