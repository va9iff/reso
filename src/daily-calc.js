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
						<th>Ədəd</th>
						<th>Məbləğ</th>
					</tr>
					${this.entries.map(
						entry => html`
							<tr ?active=${entry.num == this.activeNum} @click=${e=>{
								this.activeNum = entry.num
								console.log(entry)
							}}>
								<td l><span>${entry.num}№</span></td>
								<td>${entry.items.length}x</td>
								<td r>${entry.items.reduce((result, item)=>deci2(result+item.count*item.price), 0)}₼</td>
							</tr>
						`
					)}
				</table>
				${entry ? html`<check-paper .entry=${entry}></check-paper>` : ""}
			</div>
		`
	}
}

DailyCalc.tag = "daily-calc"
