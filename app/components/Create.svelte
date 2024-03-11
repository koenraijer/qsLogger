<page>
    <actionBar title="{pageTitle}">
        <actionItem on:tap="{saveLog}"
            ios.position="right"
            ios.systemIcon="9"
        >
            <button class="text-base pr-0 mr-0 p-1 ">
                <formattedString class="text-base font-normal">
                    <span text="&#xf0c7; " class="fas" />
                    <span text="Save&nbsp;" />
                </formattedString>
            </button>
        </actionItem>
    </actionBar>
    <stackLayout class="w-full">
        <stackLayout orientation="horizontal" class="w-full pl-4" >
            {#if logger.title.length > 0}
                <label flexGrow="1" text="{logger.title}" class="text-2xl font-bold ml-0 pl-0" />
            {:else}
                <label flexGrow="1" text="Add title..." class="text-2xl text-gray-500 font-semibold ml-0 pl-0" />
            {/if}
            <button class="fas text-black" on:tap={editTitle} flexGrow="0">
                <formattedString class="text-base font-semibold">
                    <span text="&#xf14b; " class="fas " />
                    <span text="Edit" class="text-gray-500"/>
                </formattedString>
            </button>
        </stackLayout>
        <stackLayout orientation="vertical" class="w-full">
            <button on:tap="{addInput}" class="button">
                <formattedString class="text-lg font-semibold">
                    <span text="&#xf055; " class="fas " />
                    <span text="Add input" />
                </formattedString>
            </button>
        </stackLayout>
        <listView items={new ObservableArray(logger.inputs)} itemTemplateSelector="{selectTemplate}" class="h-full mr-4">
            <Template let:item key="switch" class="ml-4">
                <flexboxLayout justifyContent="space-between">
                    <stackLayout flexGrow="1">
                        <label class="list_title">{item.title}</label>
                        <label>
                            <formattedString>
                                <span text="Type: " fontWeight="700" />
                                <span text="{item.type}" />
                            </formattedString>
                        </label>
                        <label>
                            <formattedString>
                                <span text="Labels: " fontWeight="700" />
                                <span text="{item.labels[0]}" />
                                <span text=" - " />
                                <span text="{item.labels[1]}" />
                            </formattedString>
                        </label>
                    </stackLayout>
                    <stackLayout flexGrow="0" class="h-full ml-0 mr-auto">
                        <button class="fas text-black m-0 font-normal" on:tap="{() => moveInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf0dc; " class="fas" />
                                <span text="Reorder" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                        <button class="fas text-black m-0 font-normal" on:tap="{() => editInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf14b; " class="fas" />
                                <span text="Edit" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                    </stackLayout>
                </flexboxLayout>
            </Template>
            <Template let:item key="slider">
                <flexboxLayout justifyContent="space-between" alignItems="stretch">
                    <stackLayout width="80%">
                        <label class="list_title">{item.title}</label>
                        <label>
                            <formattedString>
                                <span text="Type: " fontWeight="700" />
                                <span text="{item.type}" />
                            </formattedString>
                        </label>
                        <label>
                            <formattedString>
                                <span text="Range: " fontWeight="700" />
                                <span text="{item.range.min}" />
                                <span text=" - " />
                                <span text="{item.range.max}" />
                            </formattedString>
                        </label>
                        <label>
                            <formattedString>
                                <span text="Labels: " fontWeight="700" />
                                <span text="{item.labels[0]}" />
                                <span text=" - " />
                                <span text="{item.labels[1]}" />
                            </formattedString>
                        </label>
                    </stackLayout>
                    <stackLayout flexGrow="0" class="h-full ml-0 mr-auto">
                        <button class="fas text-black m-0 font-normal" on:tap="{() => moveInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf0dc; " class="fas" />
                                <span text="Reorder" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                        <button class="fas text-black m-0 font-normal" on:tap="{() => editInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf14b; " class="fas" />
                                <span text="Edit" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                    </stackLayout>
                </flexboxLayout>
            </Template>
            <Template let:item key="number">
                <flexboxLayout justifyContent="space-between" alignItems="stretch">
                    <stackLayout width="80%">
                        <label class="list_title">{item.title}</label>
                        <label>
                            <formattedString>
                                <span text="Type: " fontWeight="700" />
                                <span text="{item.type}" />
                            </formattedString>
                        </label>
                        <label>
                            <formattedString>
                                <span text="Range: " fontWeight="700" />
                                <span text="{item.range.min}" />
                                <span text=" - " />
                                <span text="{item.range.max}" />
                            </formattedString>
                        </label>
                    </stackLayout>
                    <stackLayout flexGrow="0" class="h-full ml-0 mr-auto">
                        <button class="fas text-black m-0 font-normal" on:tap="{() => moveInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf0dc; " class="fas" />
                                <span text="Reorder" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                        <button class="fas text-black m-0 font-normal" on:tap="{() => editInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf14b; " class="fas" />
                                <span text="Edit" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                    </stackLayout>
                </flexboxLayout>
            </Template>
            <Template let:item key="text">
                <flexboxLayout justifyContent="space-between" alignItems="stretch">
                    <stackLayout width="80%">
                        <label class="list_title">{item.title}</label>
                        <label>
                            <formattedString>
                                <span text="Type: " fontWeight="700" />
                                <span text="{item.type}" />
                            </formattedString>
                        </label>
                    </stackLayout>
                    <stackLayout flexGrow="0" class="h-full ml-0 mr-auto">
                        <button class="fas text-black m-0 font-normal" on:tap="{() => moveInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf0dc; " class="fas" />
                                <span text="Reorder" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                        <button class="fas text-black m-0 font-normal" on:tap="{() => editInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf14b; " class="fas" />
                                <span text="Edit" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                    </stackLayout>
                </flexboxLayout>
            </Template>
            <Template let:item key="choice">
                <flexboxLayout justifyContent="space-between" alignItems="stretch">
                    <stackLayout width="80%">
                        <label class="list_title">{item.title}</label>
                        <label>
                            <formattedString>
                                <span text="Type: " fontWeight="700" />
                                <span text="{item.type}" />
                            </formattedString>
                        </label>
                        <label textWrap="{true}">
                            <formattedString>
                                <span text="Options: " fontWeight="700" />
                                <span text="{item.options.join(', ')}" />
                            </formattedString>
                        </label>
                    </stackLayout>
                    <stackLayout flexGrow="0" class="h-full ml-0 mr-auto">
                        <button class="fas text-black m-0 font-normal" on:tap="{() => moveInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf0dc; " class="fas" />
                                <span text="Reorder" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                        <button class="fas text-black m-0 font-normal" on:tap="{() => editInput(item)}">
                            <formattedString class="text-sm text-left">
                                <span text="&#xf14b; " class="fas" />
                                <span text="Edit" class="text-gray-500 font-normal"/>
                            </formattedString>
                        </button>
                    </stackLayout>
                </flexboxLayout>
            </Template>
        </listView>
    </stackLayout>
</page>

<script lang="ts">
    import Home from './Home.svelte'
    import EditInput from './EditInput.svelte'
    import { action } from '@nativescript/core/ui/dialogs'
    import { prompt } from '@nativescript/core/ui/dialogs'
    import { knownFolders, Folder, File, EventData } from '@nativescript/core'
    import { ObservableArray } from '@nativescript/core/data/observable-array'
    import {getUuid} from './utils'
    import { Template } from 'svelte-native/components'
    import { navigate } from 'svelte-native';
    import {showModal} from 'svelte-native'
    import { Logger } from '../types'
    export let logger: Logger
    export let title = "new Logger"
    let pageTitle = "Create"
    let newLogger = false
    if (title !== "new Logger") {
        pageTitle = "Edit"
    }
    // If a logger is provided as a prop, use it, otherwise create a new logger
    if (!logger) {
        newLogger = true
        let date = new Date().toISOString()
        logger = {
            id: getUuid(),
            created: date,
            modified: date,
            title: title,
            inputs: [],
            path: ""
        }
    }
    const loggers_folder: Folder = knownFolders.documents().getFolder('loggers')

    function editTitle() {
        prompt({
            title: "Edit logger title",
            message: "Provide a new title for the logger",
            okButtonText: "Save",
            cancelButtonText: "Cancel",
            defaultText: "",
        }).then(res => {
            console.log(`Dialog resul: ${res.result}, text: ${res.text}`)
            if (res.result) {
                logger.title = res.text
            }
        })
    }
    
    function addInput(args: EventData) {
        action('Choose the input type', 'Cancel',  ['Number', 'Text', 'Slider', 'Choice', 'Switch'])
            .then(chosen_type => {
                if(chosen_type !== 'Cancel') {
                    prompt({
                        title: "Input title",
                        message: "Provide a title for the input",
                        okButtonText: "Save",
                        cancelButtonText: "Cancel",
                        defaultText: "",
                    }).then(input_title => {
                        if (input_title.result) {
                            if (chosen_type === 'Slider') {
                                logger.inputs.push({
                                    id: "sli-" + getUuid(),
                                    type: chosen_type,
                                    title: input_title.text,
                                    labels: ['Not at all', 'Very much'],
                                    range: { min: 0, max: 100 }
                                }); logger = logger;
                            } else if (chosen_type === 'Switch') {
                                logger.inputs.push({
                                    id: "swi-" + getUuid(),
                                    type: chosen_type,
                                    title: input_title.text,
                                    labels: ['Not at all', 'Very much'],
                                }); logger = logger;
                            } else if (chosen_type === 'Choice') {
                                logger.inputs.push({
                                    id: "cho-" + getUuid(),
                                    type: chosen_type,
                                    title: input_title.text,
                                    options: ['Option 1', 'Option 2', 'Option 3']
                                }); logger = logger;
                            } else if (chosen_type === 'Number') {
                                logger.inputs.push({
                                    id: "num-" + getUuid(),
                                    type: chosen_type,
                                    title: input_title.text,
                                    range: { min: 0, max: 100 }
                                }); logger = logger;
                            } else if (chosen_type === 'Text') {
                                logger.inputs.push({
                                    id: "tex-" + getUuid(),
                                    type: chosen_type,
                                    title: input_title.text
                                }); logger = logger;
                            }
                        }
                    })             
                }
            })
    }

    async function editInput(item: any) {
    try {
        await showModal({
            page: EditInput,
            props: {
                input: item,
            }
        }).then((res: any) => {
                    const index = logger.inputs.findIndex(input => input.id === res.inputOut.id);
                    if (index !== -1) {
                        logger.inputs[index] = res.inputOut;
                    }
            })
    } catch (error) {
        console.error("Error opening modal:", error)
    }
}

function moveInput(choice: any) { 
        logger.inputs = [...logger.inputs]
        action('Move choice', 'Cancel',  ['Move up', 'Move down']).then(
            (result) => {
                if (result === "Move down") {
                    let index = logger.inputs.indexOf(choice)
                    if (index < logger.inputs.length - 1) {
                        let temp = logger.inputs[index + 1]
                        logger.inputs[index + 1] = choice
                        logger.inputs[index] = temp
                    }
                } else if (result === "Move up") {
                    let index = logger.inputs.indexOf(choice)
                    if (index > 0) {
                        let temp = logger.inputs[index - 1]
                        logger.inputs[index - 1] = choice
                        logger.inputs[index] = temp
                    }
                }
            }
        );
    }

    function saveLog() {
        // Save loggerLayout as JSON in /loggers folder
        const file: File = loggers_folder.getFile(`${logger.id}.json`)
        logger.path = file.path
        if(!newLogger) {
            logger.modified = new Date().toISOString()
            console.log("logger modified: ", logger.modified)
        }
        logger = logger;
        file.writeText(JSON.stringify(logger)).then(() => {
            console.log('Logger layout saved')
            console.log("logger: ", logger.modified)
            navigate({
                    page: Home,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    function selectTemplate(item: any, index: number, items: any[]) {
        return item.type.toLowerCase()
    }
    
</script>