import {VLitElement, html} from './vlit.js';

import { data } from "./dummy.js"
window.data = data


import "./side-menu.js"

import "./food-menu.js"
import "./daily-calc.js"
import "./add-order.js"
let sideTabs = {
	home: ()=>html`<div style="padding: 14px; font-size: 1.3rem">
	Gündəlik qeydiyyatınızın ən rahat şəkildə aparılmasına köməklik edən və
	avtomatik hesablamaları yerinə yetirə bilən elektron estoran menecment 
	sisteminə xoş gəlmişsiniz. <br>
	<br>
	Sol tərəfdəki menyudan bir çox əməliyyatlar üçün interfeyslərə çıxış vardır.
	<ul style="padding: 20px">
		<br>
		<li>
			<b>Ana Menyu</b>: <br> 
			Yeməklərinizi kateqoriyalara uyğun bölüşdürüb nəzər sala bilərsiniz.
		</li>
		<br>
		<li>
			<b>Bugün</b>: <br> 
			Bugünlük bütün sifarişlərin çeklərini (hesablarını) görə bilərsiniz. 
			Hər bir sifarişdə hansı yeməkdən neçə ədəd olduğunu, qiymətlərini 
			və nəhayət bütün yeməklərin qiymətini, yəni sifariş məbləğini görə 
			bilərsiniz. Ayrıca bütün sifarişlərin də cəmini buradan izləyə 
			bilərsiniz. Heç bir hesablama əməliyyatı aparmağınıza ehtiyac 
			yoxdur, proqram təminatı özü sizin bunu üçün edir.
		</li>
		<br>
		<li>
			<b>Sifariş</b>: <br>
			Yeni bir sifariş qeydə almaq üçün bu interfeysdən istifadə edin. 
			Sadəcə sayını daxil edib yeməyin üstünə klik etdikdə müvafiq 
			yemək hesaba əlavə olunacaq. Aşağıda isə çekin şəkli hazırlanacaq. 
			Müştəri hesabı tələb etdikdə birbaşa çap edib təhvil vermək 
			mümkündür. Çekdə yeməklərin cəmi də avtomatik şəkildə hesablanır.
		</li>
		<br>
	</ul>

	<br>
	<br>
	<br>
	Sistemə sahib olmaq 330₼ təşkil edir.<br>




	</div>`,
	[""]: ()=>html``,
	anaMenyu: ()=>html`<food-menu></food-menu>`,
	bugun: ()=>html`<daily-calc></daily-calc>`,
	sifaris: ()=>html`<add-order></add-order>`,
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
		this.active = this.active = "home"
		this.sideBarMinimized = false
	}
	connectedCallback(){
		super.connectedCallback()
		window.updateV = () => this.requestUpdate()
		window.V = this
	}
	render(){
		return html`
		<side-menu ?minimized = ${this.sideBarMinimized} .active = ${this.active}></side-menu>
		<div class="content" ?sideMenuMinimized=${this.sideBarMinimized}>
			${sideTabs[this.active]()}
		</div>
		`
	}
}

VMain.tag = "v-main"