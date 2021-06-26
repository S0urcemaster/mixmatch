import React, {PropsWithChildren} from 'react'

import { Alignment, Button, ButtonGroup, H5, IconName } from "@blueprintjs/core"
import { Popover2 } from "@blueprintjs/popover2"

import { notes } from '../data/Note'
import styles, {css} from '../styles'

import '../App.css'
import FilterMenu from "./FilterMenu";

const padder:css = {
	padding:5,
}

function renderButton(text: string, iconName: IconName) {
	return (
			<Popover2 content={<FilterMenu />} placement="bottom-start">
				<Button rightIcon="caret-down" icon={iconName} text={text} />
			</Popover2>
	);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any>) {

	return (
			<div style={{backgroundColor:'white'}}>
				<ButtonGroup style={{ minWidth: 120 }}>
					{renderButton("Filter", "document")}
					{renderButton("Sort", "edit")}
					{renderButton("View", "eye-open")}
				</ButtonGroup>
			</div>
	)
}