import { html, VLitElement } from "./vlit.js"

console.log(window.data)
let food = (foodName)=>window.data.foods[window.data.foods.map(food=>food.name).indexOf(foodName)]
setTimeout(()=>console.log(food("Coca Cola")))

let deci2 = num => parseInt(num * 100) / 100

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
					<span end>${deci2(item.price * item.count)}₼</span> <br>
				</p>
				`
			)}
			<u total>Cəmi: ${12.80}₼</u>
		`
	}
}

CheckPaper.tag = "check-paper"
