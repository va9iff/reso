import {html, VLitElement} from "./vlit.js"

class FoodMenu extends VLitElement{
	static properties = {
		list: {},
		currentCatagory: {}
	}
	constructor(){
		super()
		// this.list = window.data.foods
		this.list = []
		this.currentCatagory = ""
	}
	filter(category){
		if (category==this.currentCatagory){
			this.currentCatagory = ""
			// this.list = window.data.foods
			this.list = []
			return
		}
		this.currentCatagory = category
		this.list = window.data.foods.filter(food => food.category == category)
	}
	render(){
		return html`
		<div class="gradientBG">
		</div>
		<div class="categories">
			<button @click = ${e=>this.filter("Əsas yeməklər")} ?active = ${this.currentCatagory == "Əsas yeməklər"}>Əsas yeməklər</button>
			<button @click = ${e=>this.filter("Salatlar")} ?active = ${this.currentCatagory == "Salatlar"}>Salatlar</button>
			<button @click = ${e=>this.filter("İçkilər")} ?active = ${this.currentCatagory == "İçkilər"}>İçkilər</button>
			<button @click = ${e=>this.filter("Desertlər")} ?active = ${this.currentCatagory == "Desertlər"}>Desertlər</button>
		</div>
		<div class="foodsList">
			${this.list.map(food=>html`<p>${food.name} <span end>${food.price}</span>₼</p>`)}
		</div>
		`
	}
}

FoodMenu.tag = "food-menu"