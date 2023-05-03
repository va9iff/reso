import { html, VLitElement } from "./vlit.js"

let increment = (arr, obj) => {
	if (arr.map(item=>item.name).includes(obj.name)){
		// console.log("includes", obj)
		arr[arr.map(item=>item.name).indexOf(obj.name)].count++
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
	constructor(){
		super()
		this.selectedFood = ""
		this.active = window.activeOrder || [/*{name: "hi", count: 7}*/]
		this.selectedCount = 1
	}
	add(){
		// this.active = [...this.active, {name: this.selectedFood, count: this.selectedCount}]
		let price = window.data.foods.filter(food=>food.name==this.selectedFood)[0].price
		increment(this.active, { name: this.selectedFood, count: this.selectedCount, price  })
		this.selectedFood = ""
		this.selectedCount = 1

		this.requestUpdate()
	}
	addOrder(){
		window.data.today.push({
			num: window.data.today.length,
			items: this.active
		})
				this.selectedFood = ""
		this.active = [/*{name: "hi", count: 7}*/]
		this.selectedCount = 1
		window.toLastCalc = true
		window.V.active = "bugun"
	}
	reset(){
		this.selectedFood = ""
		this.active = [/*{name: "hi", count: 7}*/]
		this.selectedCount = 1

	}
	render(){
		window.activeOrder = this.active
		return html`
			<select @change=${e => this.selectedFood = e.target.value}>
					<option value="" ?selected = ${!this.selectedFood}>-Yemək Seçin-</option>
				${window.data.foods.map(food=>html`
					<option value=${food.name}>${food.name}</option>
					`)}
			</select>
			<br>
			<button @click = ${this.add} ?disabled = ${!this.selectedFood}>Əlavə Et</button>
			<br>
			<button class="round" @click=${e=>this.selectedCount--}>-</button>
			<input type="number" .value = ${this.selectedCount}>
			<button class="round" @click=${e=>this.selectedCount++}>+</button>
			${
				this.active.map(order=>html`<p>${order.name} ${order.count}x</p>`)
			}
			<br>
			<button @click = ${this.reset}>Çeki Sil</button>
			<br>
			<br>
			<br>
			<button @click = ${this.addOrder} ?disabled = ${!this.active.length}>Çeki Əlavə Et</button>

		`
	}
}

AddOrder.tag = "add-order"