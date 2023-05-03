import { html, VLitElement } from "./vlit.js"

let deci2 = num => Math.round(num * 100) / 100

import "./check-paper.js"
class DailyCalc extends VLitElement {
	static properties = {
		entries: {},
		activeNum: {},
	}
	constructor() {
		super()
		this.entries = window.data.today
		this.activeNum = 4
	}

	render() {
		let entry = this.entries.filter(entry=>entry.num==this.activeNum)[0]
		console.log(entry)
		return html`
			<div class="orderCheck">
				<table>
					<tr>
						<th>№</th>
						<th>Məbləğ</th>
					</tr>
					${this.entries.map(
						entry => html`
							<tr ?active=${entry.num == this.activeNum} @click=${e=>{
								this.activeNum = entry.num
								console.log(entry)
							}}>
								<td nums><span>${entry.num}№</span></td>
								<td>${entry.items.reduce((result, item)=>deci2(result + deci2(item.count*item.price)), 0)}₼</td>
							</tr>
						`
					)}
					<tr>
						<td>Cəm</td>
						<td>
							${this.entries.map(entry=>entry.items.reduce((result, item)=>deci2(result + deci2(item.count*item.price)), 0)).reduce((result, price)=>deci2(result + price))}₼
						</td>
					</tr>
				</table>
				${entry ? html`<check-paper .entry=${entry}></check-paper>` : ""}
			</div>
		`
	}
}

DailyCalc.tag = "daily-calc"
