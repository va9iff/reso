import { html, VLitElement } from "./vlit.js"

let increment = (arr, obj) => {
	if (arr.map(item => item.name).includes(obj.name)) {
		// console.log("includes", obj)
		arr[arr.map(item => item.name).indexOf(obj.name)].count += obj.count
	} else {
		arr.push(obj)
	}
	return arr
}

class AddOrder extends VLitElement {
	static properties = {
		active: {},
		selectedFood: {},
		selectedCount: {},
	}
	constructor() {
		super()
		this.selectedFood = ""
		this.active =
			window.activeOrder ||
			[
				/*{name: "hi", count: 7}*/
			]
		this.selectedCount = 0
	}
	add() {
		// this.active = [...this.active, {name: this.selectedFood, count: this.selectedCount}]
		let price = window.data.foods.filter(
			food => food.name == this.selectedFood
		)[0].price
		increment(this.active, {
			name: this.selectedFood,
			count: this.selectedCount,
			price,
		})
		this.selectedFood = ""
		this.selectedCount = 0

		this.requestUpdate()
	}
	addOrder() {
		window.data.today.push({
			num: Math.max(...window.data.today.map(order=>+order.num))+1,
			items: this.active,
		})
		this.selectedFood = ""
		this.active = [
			/*{name: "hi", count: 7}*/
		]
		this.selectedCount = 1
		window.toLastCalc = true
		window.V.active = "bugun"
	}
	reset() {
		this.selectedFood = ""
		this.active = [
			/*{name: "hi", count: 7}*/
		]
		this.selectedCount = 0
	}
	addWithFoodButton(food) {
		this.selectedFood = food.name
		this.add()
	}
	render() {
		window.activeOrder = this.active
		return html`
			<div>

				<div class="foods">
					${window.data.foods.map(
						food => html`
							<button
								?disabled=${+this.selectedCount == 0}
								@click=${e => this.addWithFoodButton(food)}
							>
								${food.name}
							</button>
						`
					)}
				</div>
				<div class="buttons">
					<button class="round" @click=${e => this.selectedCount--}>-</button>
					<input
						type="number"
						@change=${e => (this.selectedCount = parseInt(e.target.value))}
						.value=${this.selectedCount}
					/>
					<button class="round" @click=${e => this.selectedCount++}>+</button>

					<button @click=${this.addOrder} ?disabled=${!this.active.length} class="addOrderButton">
						Çeki Tamamla
					</button>
					<button @click=${this.reset} deleter>Çeki Sil</button>
				</div>
				<check-paper .entry=${{ num: Math.max(...window.data.today.map(order=>+order.num))+1, items: this.active }}></check-paper>
			</div>
		`
	}
}

AddOrder.tag = "add-order"
