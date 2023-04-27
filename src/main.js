import {VLitElement, html} from './vlit.js';

import { data } from "./dummy.js"
window.data = data


import "./side-menu.js"

import "./food-menu.js"
import "./daily-calc.js"
let sideTabs = {
	home: ()=>html`<h3>Xoş gəlmişsiniz</h3>`,
	[""]: ()=>html``,
	anaMenyu: ()=>html`<food-menu></food-menu>`,
	bugun: ()=>html`<daily-calc></daily-calc>`,
	tarixce: ()=>html`Buradan istənilən günün qeydiyyatı nəzərdən keçirilə biləcək`,
	yemekElavesi: ()=>html`Burada yeni yeməklər əlavə olunaraq qiymət təyin olunacaq`,
	adminMenyu: ()=>html`Burada cari menyu üzərində dəyişikliklər aparıla bilər (admin kodları olan şəxslər üçün)`,
}


class VMain extends VLitElement{
	static properties ={
		active: {},
		sideBarMinimized : {}
	}
	constructor(){
		super()
		this.active = this.active = "bugun"
		this.sideBarMinimized = false
	}
	connectedCallback(){
		super.connectedCallback()
		window.updateV = () => this.requestUpdate()
		window.V = this
	}
	render(){
		return html`
		<side-menu ?minimized = ${this.sideBarMinimized}></side-menu>
		<div class="content" ?sideMenuMinimized=${this.sideBarMinimized}>
			${sideTabs[this.active]()}
		</div>
		`
	}
}

VMain.tag = "v-main"