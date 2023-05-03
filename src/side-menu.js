import {VLitElement, html, classMap} from './vlit.js';

class SideMenu extends VLitElement{
	static properties = {
		active: {},
	}
	sideBarActivate(tabName){
		window.V.active = tabName
		this.requestUpdate()
	}
	render(){
		return html`
			<h3 ?hidden=${window.V.sideBarMinimized}>Vsys</h3>
			<button @click=${e=>this.sideBarActivate("anaMenyu")} ?active = ${this.active=="anaMenyu"} ?hidden=${window.V.sideBarMinimized}>Ana menyu</button>
			<button @click=${e=>this.sideBarActivate("bugun")} ?active = ${this.active=="bugun"} ?hidden=${window.V.sideBarMinimized} active>Bugün</button>
			<button @click=${e=>this.sideBarActivate("sifaris")} ?active = ${this.active=="sifaris"} ?hidden=${window.V.sideBarMinimized}>Sifariş</button>
			<button @click=${e=>{
				this.sideBarActivate("")
			}} ?hidden = ${!window.V.active || window.V.sideBarMinimized || true}>Bağla</button>
			<button @click=${e=>{
				window.V.sideBarMinimized =! window.V.sideBarMinimized
				this.requestUpdate()
			}} toggler>${!window.V.sideBarMinimized?"Gizlə":"≡"}</button>
		`
	}
}

SideMenu.tag = "side-menu"

