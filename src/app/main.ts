import glass from "glass"
import App from "./App"
import { Theme } from "glass/lib/html/style";
import { StorageStateManager } from "glass/lib/state";
import { VirtualDomBinding, Stylesheets } from "glass/lib/html";

//  state manager
const stateManagers = {
    local: new StorageStateManager(window.localStorage),
    session: new StorageStateManager(window.sessionStorage)
}

//  watch the state manager for theme changes
let themes = { light: Theme.light, dark: Theme.dark }
stateManagers.local.watch("theme", (value) => {
    Stylesheets.theme = themes[value || "light"]
})

//  bind the app function to the dom with our state manager
let binding = new VirtualDomBinding(document.body, App, stateManagers)