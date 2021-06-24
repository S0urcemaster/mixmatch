import React, {PropsWithChildren} from "react";
import styles, {} from "../styles";

import {Button} from "@blueprintjs/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any> & { fileSelected: (file: string) => void }) {

	return (
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<h1 style={{margin: 0}}>Set</h1>
				<Button style={{...styles.buttonSmall, marginLeft: 30, marginTop: 2}} icon={'bring-data'}
						onClick={props.fileSelected}>Import</Button>
			</div>
	)
}