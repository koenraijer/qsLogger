<script lang="ts">
    import Create from './Create.svelte'
    import Logger from './Logger.svelte'
    import { Logger } from '../types'
	import { navigate } from 'svelte-native'
    import { prompt, action, confirm } from '@nativescript/core/ui/dialogs'
    import { Template } from 'svelte-native/components'
    import { onMount } from 'svelte'
    import { ObservableArray } from '@nativescript/core/data/observable-array'
    import { knownFolders, Folder, FileSystemEntity } from '@nativescript/core'
    
    let listView: any

    async function loadLoggers(loggers_folder: Folder) {
            loggers_folder
            .getEntities()
            .then((entities: FileSystemEntity[]) => {
                entities.forEach((entity: FileSystemEntity) => {
                    const logger_file = loggers_folder.getFile(entity.name)
                    logger_file.readText().then((content) => {
                        // Load as JSON
                        const logger = JSON.parse(content)
                        // Check if the logger already exists in the list
                        const exists = logger_list.some(item => item.id === logger.id);
                        // Add the logger to the list only if it doesn't already exist
                        if (!exists) {
                            let newLogger: Logger = {
                                id: logger.id,
                                created: logger.created,
                                modified: logger.modified,
                                title: logger.title,
                                inputs: logger.inputs,
                                path: logger_file.path
                            };
                            logger_list.push(newLogger);
                        }
                        // Sort the list by last modified date
                        logger_list = logger_list.sort((a, b) => {
                            return new Date(b.modified).getTime() - new Date(a.modified).getTime()
                        })
                    })
                })
            })
            .catch((err) => {
                console.log(err)
        })
    }

    const loggers_folder: Folder = knownFolders.documents().getFolder('loggers')

    let logger_list: ObservableArray<Logger> = new ObservableArray([])

    function goToCreate() {
        prompt({
            title: "Add new logger",
            message: "Provide a title for the logger",
            okButtonText: "Create",
            cancelButtonText: "Cancel",
            defaultText: "",
        }).then(res => {
            if (res.result) {
                navigate({
                    page: Create,
                    props: {
                        title: res.text as never
                    }
                })
            }
        })
    }

    function goToLogger(args: any){
        navigate({
            page: Logger,
            props: {
                logger: logger_list.getItem(args.index)
            }
        })
    }

    function openMenu(item: any) {
        let index = logger_list.indexOf(item)
        action('', 'Cancel',  ['Open', 'Edit', 'Move', 'Delete'])
            .then(result => {
                if (result === 'Cancel') return
                if (result === 'Open') {
                    navigate({
                        page: Logger,
                        props: {
                            logger: logger_list.getItem(index)
                        }
                    })
                }
                if (result === 'Edit') {
                    navigate({
                        page: Create,
                        props: {
                            logger: logger_list.getItem(index)
                        }
                    })
                }
                if (result === 'Move') {
                    action('Move', 'Cancel',  ['Move up', 'Move down'])
                        .then(result => {
                            if (result === 'Move up') {
                                if (index > 0) {
                                    let temp = logger_list.getItem(index - 1)
                                    logger_list.setItem(index - 1, item)
                                    logger_list.setItem(index, temp)
                                }
                            }
                            if (result === 'Move down') {
                                if (index < logger_list.length - 1) {
                                    let temp = logger_list.getItem(index + 1)
                                    logger_list.setItem(index + 1, item)
                                    logger_list.setItem(index, temp)
                                }
                            }
                        })
                }
                if (result === 'Delete') {
                    confirm({
                        title: "Do you want to delete this logger?",
                        message: "Press delete to permanently delete the logger.",
                        okButtonText: "Delete",
                        cancelButtonText: "Cancel"
                    }).then(res => {
                        if (res) {
                            let logger_file = loggers_folder.getFile(item.id + '.json')
                            logger_file.remove()
                            logger_list.splice(index, 1)
                        }
                    })
                }
            })
    }
    onMount(async () => {
        await loadLoggers(loggers_folder)
    })

    function convertDateString(datestring: string) {
        let date = new Date(datestring)
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let formattedDate = `${day}-${month}-${year} at ${hours}:${minutes}`;
        return formattedDate
    }
</script>

<page on:navigatedTo="{() => { loadLoggers(loggers_folder) }}">
    <actionBar title="qsLogger">
        <actionItem on:tap="{goToCreate}"
            ios.position="right"
            ios.systemIcon="12"
        >
            <label text="&#xf0fe;" class="fas text-2xl font-bold" />
        </actionItem>
    </actionBar>
    <listView items={logger_list} bind:this={listView} on:itemTap="{goToLogger}" class="w-full m-0 p-0 bg-gray-100" separatorColor="transparent">
        <Template let:item>
            <flexboxLayout justifyContent="space-between" alignItems="stretch" class="w-full bg-white shadow-md rounded-lg p-0 m-0 border border-gray-700">
                <stackLayout>
                    <label class="text-xl">{item.title}</label>
    `               <label>
                        <formattedString class="text-base font-semibold">
                            <span text="{convertDateString(item.created)}" class="text-sm" />
                        </formattedString>
                    </label>
                    <label>
                        <formattedString class="text-xs font-normal text-gray-600">
                            <span text="Last modified on " />
                            <span text="{convertDateString(item.modified)}"/>
                        </formattedString>
                    </label>
                </stackLayout>
                <stackLayout flexGrow="0" class="h-full">
                    <button class="fas text-black" on:tap="{() => openMenu(item)}">
                        <formattedString class="text-base p-0 m-0">
                            <span text="&#xf142;       " class="fas" />
                        </formattedString>
                    </button>
                </stackLayout>
            </flexboxLayout>
        </Template>
    </listView>
</page>

