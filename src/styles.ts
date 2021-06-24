
import React from "react";

export type css = React.CSSProperties

class Styles {
	detailsTitle:css = {
		margin: '0 0 0px 0',
		lineHeight:1,
		minHeight:35,
	}
	detailsLine:css = {
		margin:0,
	}
	buttonSmall:css = {
		padding:'2px 5px 2px 5px',
		height:25,
		minHeight:0
	}

}

export default new Styles()
