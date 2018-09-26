import { Context } from "glass/lib/html";
import styles from "./AppStyles"; styles

export default function App(c: Context) {
    const { h, state, peek, InputText, InputNumber, Checkbox, Div, Span, Label, P, H1, H2, H3 } = c
    let theme = state.local.theme || "light"
    return (
        Div({ class: "column", style: "width:300px" },
            Label({ class: "row" },
                Checkbox({
                    id: "themeCheckbox",
                    value: state.local.theme === "dark",
                    onchange(value) { state.local.theme = value ? "dark" : "light" }
                }),
                Span(`Use Dark Theme?`)
            ),
            Label(
                Span(`InputText type:text`),
                InputText({ id: "input_text" }),
            ),
            Label(
                Span(`InputText type:textarea`),
                InputText({ id: "input_textarea", type: "textarea", style: "height: 60px" }),
            )
        )
    )
}
