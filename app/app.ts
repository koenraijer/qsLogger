/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/
import { svelteNativeNoFrame } from 'svelte-native'
import App from './App.svelte'
import CollectionViewElement from '@nativescript-community/ui-collectionview/svelte';
// import ListView from "svelte-native-nativescript-ui/listview" // https://market.nativescript.org/plugins/svelte-native-nativescript-ui/
import RadListViewElement from "svelte-native-nativescript-ui/listview"

// ListView.register();
RadListViewElement.register();
CollectionViewElement.register();

// registerNativeViewElement("collectionView", () => require("@nativescript-community/ui-collectionview").CollectionView);

svelteNativeNoFrame(App, {})
