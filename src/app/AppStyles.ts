import { Stylesheets } from "glass/lib/html"

const margin = 6
const pageMargin = margin * 4

export default Stylesheets.add(theme => `
    body {
        background-color: ${theme.colors.background};
        color: ${theme.colors.foreground};
        padding: ${pageMargin}px;
    }
    .margin, input, textarea, select, p, h1, h2, h3, label > span {
        margin: ${margin}px;
    }
    label {
        display: flex;
        flex-direction: column;
    }
    label.row {
        align-items: center;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
    .column {
        display: flex;
        flex-direction: column;
    }
`)
