<frame id="edit-input-frame">
    <page>
        <actionBar title="Edit {input.type.toLowerCase()} input">
            <actionItem on:tap="{saveAndClose}"
                ios.position="right"
                ios.systemIcon="12"
            >
                <label text="Save" class="text-lg" />
            </actionItem>
        </actionBar>
        <flexboxLayout flexDirection="column" class="mx-4 h-full">
            <!--<label>{JSON.stringify(input)}</label>-->
            <label class="textfield_label" text="Title" flexGrow="0" />
            <textField class="text_field" bind:text="{inputTitle}" flexGrow="0" />
            {#if input.type === "Number" || input.type === "Slider"}
                <label class="textfield_label" text="Minimum value" />
                <textField class="text_field" bind:text="{inputMin}" />
                <label class="textfield_label"  text="Maximum value" />
                <textField class="text_field" bind:text="{inputMax}" />
            {/if}
            {#if input.type === "Slider" || input.type === "Switch"}
                <label class="textfield_label"  text="Left label" />
                <textField class="text_field" bind:text="{inputLabels[0]}" />
                <label class="textfield_label"  text="Right label" />
                <textField class="text_field" bind:text="{inputLabels[1]}" />
            {/if}
        </flexboxLayout>
        {#if input.type === "Choice"}
            <flexboxLayout flexDirection="column" justifyContent="space-between" class="mx-2 h-full w-full">
                <label class="textfield_label w-full" text="Title" flexGrow="0" />
                <textField class="text_field w-full" bind:text="{inputTitle}" flexGrow="0" />
                {#if inputChoices.length === 0}
                    <label class="textfield_label"  text="No options added yet" />
                {:else}
                    <label class="textfield_label"  text="Answer options" />

                    <collectionView 
                        items={new ObservableArray(inputChoices)} 
                        flexGrow="1" 
                        colWidth="100%"
                        class="w-full mx-4"
                    >
                        <Template let:item >
                            <flexboxLayout flexDirection="row" justifyContent="space-between">
                                <label text="&#xf057;" class="fas text-black text-lg mx-0" on:tap="{() => removeChoice(item)}" />
                                <label class="text_field my-2 mx-1" flexGrow="1" text="{item}" on:tap="{() => editChoice(item)}"/>
                                <label text="&#xf0dc;" class="fas text-black text-lg mx-0" on:tap="{() => moveChoice(item)}" />
                            </flexboxLayout>
                        </Template>
                    </collectionView>
                {/if}
                <button on:tap="{addChoice}" flexGrow="0" class="button">
                    <formattedString class="text-lg font-semibold">
                        <span text="&#xf055; " class="fas" />
                        <span text="Add answer option" />
                    </formattedString>
                </button>
            </flexboxLayout>
        {/if}
    </page>
</frame>

<script lang="ts">
    import { closeModal } from 'svelte-native'
    import { Template } from 'svelte-native/components'
    import { ObservableArray } from '@nativescript/core/data/observable-array'
    import { action, prompt } from '@nativescript/core/ui/dialogs'
    export let input: any
    let choiceText: string = ""

    let inputMin = input.range && input.range.min ? input.range.min : 0
    let inputMax = input.range && input.range.max ? input.range.max : 100
    let inputLabels = input.labels ? input.labels : []
    let inputTitle: string = input.title ? input.title : ""

    let inputChoices = input.options ? input.options : []

    function addChoice() {
        prompt({
            title: "Add option",
            message: "Provide a title for the option",
            okButtonText: "Save",
            cancelButtonText: "Cancel",
            defaultText: "",
        }).then(res => {
            console.log(`Dialog resul: ${res.result}, text: ${res.text}`)
            if (res.result) {
                inputChoices = [...inputChoices, res.text]
            }
        })
    }

    function updateChoice(item: any) {
        // let index = inputChoices.indexOf(item)
        // inputChoices[index] = item
        inputChoices = inputChoices
    }
    
    function editChoice(item: any) {
        try {
            prompt({
                title: "Edit choice",
                message: "Provide a new title for the choice",
                okButtonText: "Save",
                cancelButtonText: "Cancel",
                defaultText: item,
            }).then((res) => {
                if (res.result) {
                    const index = inputChoices.indexOf(item);
                    if (index !== -1) {
                        inputChoices[index] = res.text;
                    }
                }
            });
        } catch (error) {
            console.error("Error editing choice:", error);
        }
    }
    function removeChoice(choice: any) {
        inputChoices = [...inputChoices.filter((item: any) => item !== choice)];
    }

    function moveChoice(choice: any) {
        inputChoices = [...inputChoices]
        action('Move choice', 'Cancel',  ['Move up', 'Move down']).then(
            (result) => {
                if (result === "Move down") {
                    let index = inputChoices.indexOf(choice)
                    if (index < inputChoices.length - 1) {
                        let temp = inputChoices[index + 1]
                        inputChoices[index + 1] = choice
                        inputChoices[index] = temp
                    }
                } else if (result === "Move up") {
                    let index = inputChoices.indexOf(choice)
                    if (index > 0) {
                        let temp = inputChoices[index - 1]
                        inputChoices[index - 1] = choice
                        inputChoices[index] = temp
                    }
                }
            }
        );
    }

    function saveAndClose() {
        let inputOut: { id: number; type: string; title: string; range?: { min: number; max: number }; labels?: []; options?: [] } = {
                id: input.id,
                type: input.type,
                title: inputTitle
        };

        if (input.type === "Number" || input.type === "Slider") {
            inputOut.range = { min: inputMin, max: inputMax };
        }
        if (input.type === "Slider" || input.type === "Switch") {
            inputOut.labels = inputLabels;
        }
        if (input.type === "Choice") {
            inputOut.options = inputChoices;
        }

        closeModal({ 
            inputOut
        })
    }

</script>