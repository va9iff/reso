import {html, css, LitElement, classMap, ref} from "./lit.js"

class VLitElement extends LitElement {
	createRenderRoot() {
	  return this;
	}
	static set tag(tagName){
		customElements.define(tagName, this);
	} 
}

export {html, css, LitElement, VLitElement, classMap}