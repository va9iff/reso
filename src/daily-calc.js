import { html, VLitElement } from "./vlit.js"

let deci2 = num => Math.round(num * 100) / 100

import "./check-paper.js"
class DailyCalc extends VLitElement {
	static properties = {
		entries: {},
		activeNum: {},
		entry: {},
	}
	constructor() {
		super()
		this.entries = window.data.today
		this.activeNum = null
		if (window.toLastCalc) {
			this.activeNum = this.entries.length - 1
			this.entry = this.entries.at(-1)
			window.toLastCalc = null
		}
	}

	render() {
				return html`
			<div class="orderCheck">
				<table>
					<tr>
						<th>№</th>
						<th>Məbləğ</th>
					</tr>
					${this.entries.map(
						entry => html`
							<tr ?active=${entry.num == this.activeNum || this.activeNum == "X"} @click=${e=>{
								// if(this.activeNum == entry.num) {
									// this.activeNum = null
									// this.entry = null
									// return
								// }
								this.activeNum = entry.num
								this.entry = this.entries.filter(entry=>entry.num==this.activeNum)[0]
								console.log(entry)
							}}>
								<td nums><span>${entry.num}№</span></td>
								<td>${entry.items.reduce((result, item)=>deci2(result + deci2(item.count*item.price)), 0)}₼</td>
							</tr>
						`
					)}
					<tr ?active=${this.activeNum == "X"} @click=${e=>{
						// one entry becomes the total of the all entries of today
						this.entry = this.entries.reduce((result, entry)=>{
							for (let item of entry.items){
								if (result.items.map(item=>item.name).includes(item.name)){
									let index = result.items.map(item=>item.name).indexOf(item.name)
									// console.log(item.name, result.items[index].count, item.count)
									// console.log(item.name, result.items[index].name, result.items[index].count)
									console.log(item.name, result.items[index].count, item.count)
									result.items[index].count += item.count
									console.log(result.items[index].count)
								} else {
									result.items.push({...item})
								}

							}
							return result
						}, { num: "X", items: [] }, [])
						this.activeNum = "X"
					}}>
						<td nums><span>Cəm</span></td>
						<td>
							${this.entries.map(entry=>entry.items.reduce((result, item)=>deci2(result + deci2(item.count*item.price)), 0)).reduce((result, price)=>deci2(result + price), 0)}₼
						</td>
					</tr>
				</table>
				${this.entry ? html`<check-paper .entry=${this.entry}></check-paper>` : ""}
			</div>
		`
	}
}

DailyCalc.tag = "daily-calc"
