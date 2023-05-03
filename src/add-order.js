import { html, VLitElement } from "./vlit.js"

let increment = (arr, obj) => {
	if (arr.map(item=>item.name).includes(obj.name)){
		// console.log("includes", obj)
		arr[arr.map(item=>item.name).indexOf(obj.name)].count+=obj.count
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
		<div>
			<select @change=${e => this.selectedFood = e.target.value}>
					<option value="" ?selected = ${!this.selectedFood}>-Yemək Seçin-</option>
				${window.data.foods.map(food=>html`
					<option value=${food.name}>${food.name}</option>
					`)}
			</select>
			<br>
			<button class="round" @click=${e=>this.selectedCount--} ?disabled = ${!this.selectedFood}>-</button>
			<input type="number" @change=${e=>this.selectedCount=parseInt(e.target.value)} .value = ${this.selectedCount} ?disabled = ${!this.selectedFood}>
			<button class="round" @click=${e=>this.selectedCount++} ?disabled = ${!this.selectedFood}>+</button>
			<br>
			<button @click = ${this.add} ?disabled = ${!this.selectedFood}>Əlavə Et</button>
			<br>
			<button @click = ${this.addOrder} ?disabled = ${!this.active.length}>Çeki Əlavə Et</button>
			<br>
			<br>
			<br>
			<button @click = ${this.reset}>Çeki Sil</button>
		</div>
			<check-paper .entry=${{num: "0",items: this.active}}></check-paper>

		`
	}
}

AddOrder.tag = "add-order"