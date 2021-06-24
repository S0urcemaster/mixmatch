import React from 'react';
import {css} from "../styles";

const header:css = {
	display:'flex',
	alignItems:'flex-end',
	paddingBottom:'0.1vh',
}

const headerTitle:css = {
	fontFamily:'orbitron',
	fontSize:'24pt',
	marginRight:'4vw',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
	return (
			<div style={header}>
				<div style={headerTitle}>mixmatch</div>
			</div>
	)
}