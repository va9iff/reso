import { html, VLitElement } from "./vlit.js"

console.log(window.data)
let food = (foodName)=>window.data.foods[window.data.foods.map(food=>food.name).indexOf(foodName)]
setTimeout(()=>console.log(food("Coca Cola")))

class CheckPaper extends VLitElement {
	static properties = {
		entry: {}, //
		num: {},
	}
	constructor() {
		super()
		// this.entries = [{ item: {} }]
	}
	render() {
		return html`
			<h3>${this.entry.num}№ Sifariş üçün hesab</h3>
			${this.entry.items.map(
				item => html`
				<p>
					${item.name} x${item.count}
					<span end>${food(item.name).price * item.count}</span> <br>
				</p>
				`
			)}
			<u>Cəmi: ${12.80}man</u>
		`
	}
}

CheckPaper.tag = "check-paper"
