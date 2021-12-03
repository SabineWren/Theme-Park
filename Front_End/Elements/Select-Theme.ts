import { html, LitElement } from "lit"
import { state } from "lit/decorators.js"

const THEMES_DARK = [
	{ SlClass: "sl-theme-dark", Label: "Default" },
	{ SlClass: "sl-theme-test", Label: "Test" },
] as const
const THEMES_LIGHT = [
	{ SlClass: "sl-theme-light", Label: "Default" },
] as const
type themeDark = typeof THEMES_DARK[number]
type themeLight = typeof THEMES_LIGHT[number]
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")

const loadStylesheet = (theme: themeDark | themeLight) => {
	const url = `/${theme.SlClass}.css`
	return document.querySelector(`link[href="${url}"]`)
		? Promise.resolve()
		: new Promise(resolve => {
			const link = document.createElement('link')
			link.rel = "stylesheet"
			link.href = url
			$(document, "head").appendChild(link)
			link.onload = resolve
		})
}

enum ThemePref { Auto=1, Light=2, Dark=3 }
const getIsLight = (t: ThemePref) => t === ThemePref.Light
	|| t === ThemePref.Auto && MEDIA_PREF_LIGHT.matches
export class SelectTheme extends LitElement {
	@state() private pref = ThemePref.Auto
	@state() private dark: themeDark = THEMES_DARK[0]
	@state() private light: themeLight = THEMES_LIGHT[0]
	override connectedCallback() {
		MEDIA_PREF_LIGHT.addEventListener("change", () => {
			if (this.pref === ThemePref.Auto) { this.requestUpdate() }
		})
		return super.connectedCallback() }
	override render() {
		const t = getIsLight(this.pref) ? this.light : this.dark
		loadStylesheet(t).then(() => $(document, "body").className = t.SlClass)
		const modeItem = (p: ThemePref, t: string) => html`
<sl-menu-item ?checked=${p === this.pref} value="${p}">${t}</sl-menu-item>`
		return html`
<sl-button-group>
	<sl-dropdown>
		<sl-button slot="trigger" size="small" caret type="default">
			<sl-icon name="${getIsLight(this.pref) ? "sun" : "moon"}"></sl-icon>
		</sl-button>
		<sl-menu @sl-select=${(e: any) => this.pref = Number.parseInt(e.detail.item.value)}>
			${modeItem(ThemePref.Dark, "Dark")}
			${modeItem(ThemePref.Light, "Light")}
			${modeItem(ThemePref.Auto, "Auto")}
		</sl-menu>
	</sl-dropdown>
	${getIsLight(this.pref)
	? renderTheme(this.light, THEMES_LIGHT,
		(t: themeLight) => this.light = t)
	: renderTheme(this.dark, THEMES_DARK,
		(t: themeDark) => this.dark = t)
	}
<sl-button-group>`
	}
}

const renderTheme = <T extends themeDark | themeLight>(
	selected: T, options: readonly T[],
	setTheme: (e: T) => any) => html`
<sl-dropdown>
	<sl-button size="small" slot="trigger" caret>${selected.Label}</sl-button>
	<sl-menu size="small"
		@sl-select=${(e: any) => setTheme(e.detail.item.theme)}>
		${options.map(o => html`
		<sl-menu-item ?checked=${o === selected} .theme="${o}">${o.Label}</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
