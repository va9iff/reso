import {VLitElement, html, classMap} from './vlit.js';

class SideMenu extends VLitElement{
	sideBarActivate(tabName){
		window.V.active = tabName
		this.requestUpdate()
	}
	render(){
		return html`
			<h3 ?hidden=${window.V.sideBarMinimized}>Vsys</h3>
			<button @click=${e=>this.sideBarActivate("anaMenyu")} ?active = ${window.V.active=="anaMenyu"} ?hidden=${window.V.sideBarMinimized}>Ana menyu</button>
			<button @click=${e=>this.sideBarActivate("bugun")} ?active = ${window.V.active=="bugun"} ?hidden=${window.V.sideBarMinimized} active>Bugün</button>
			<button @click=${e=>this.sideBarActivate("tarixce")} ?active = ${window.V.active=="tarixce"} ?hidden=${window.V.sideBarMinimized}>Tarixçə</button>
			<button @click=${e=>this.sideBarActivate("yemekElavesi")} ?active = ${window.V.active=="yemekElavesi"} ?hidden=${window.V.sideBarMinimized}>Yemək əlavəsi</button>
			<button @click=${e=>this.sideBarActivate("adminMenyu")} ?active = ${window.V.active=="adminMenyu"} ?hidden=${window.V.sideBarMinimized}>Admin menyu</button>
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

