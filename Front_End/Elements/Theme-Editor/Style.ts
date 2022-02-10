import { css } from "lit"

export const Style = css`
* { min-width: unset; }
:host {
	display: inline-block;
	--spacing: 1.5rem;
	--swatch-size: 62px;
}
.flex { display: flex; gap: var(--spacing); }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: var(--spacing);
	box-shadow: var(--sl-shadow-large);
}
sl-card::part(body) {
	display: flex; flex-direction: column; gap: var(--spacing);
}

/* Input Controls */
sl-tab-group#colour-keys sl-tab::part(base) {
	width: 100%;
	padding: 0.5rem; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) { background: var(--background); }
sl-tag::part(content) { color: var(--colour); }

.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

/* Output */
#swatches { gap: 5px }
.swatch {
	display: inline-block;
	width: var(--swatch-size);
	height: var(--swatch-size);
	border-radius: 2px;
}

sl-color-picker {
	--grid-width: 320px;
	--swatch-size: 30px;
}
sl-color-picker::part(base) {
	box-shadow: none; }

table {
	margin-right: auto;
	border-collapse: separate;
	border-spacing: 0; }
td { padding: 0; }

a { color: inherit; text-decoration: inherit; }
`
