import React, {PropsWithChildren} from 'react'

import { Button, ButtonGroup, IconName } from "@blueprintjs/core"
import { Popover2 } from "@blueprintjs/popover2"

import styles, {css} from '../styles'

import '../App.css'
import FilterMenu from "./FilterMenu";
import ZetFilterMenu from "./ZetFilterMenu";

const padder:css = {
	padding:5,
}

function renderButton(text: string, iconName: IconName) {
	return (
			<Popover2 transitionDuration={0} content={<FilterMenu />} placement="bottom-start">
				<Button rightIcon="caret-down" icon={iconName} text={text} />
			</Popover2>
	);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any> &
		{ filterNml:() => void, importNml:() => void, }
):JSX.Element {
	
	return (
			<div style={{backgroundColor:'white'}}>
				<ButtonGroup style={{ minWidth: 120, display:'flex', justifyContent:'space-between'}}>
					<div>
						<Popover2 transitionDuration={0} content={<ZetFilterMenu importNml={props.filterNml}/>}
									 placement="bottom-start">
							<Button rightIcon="caret-down" icon='filter' text={'Filter'} />
						</Popover2>
						{renderButton("Sort", "edit")}
						{renderButton("View", "eye-open")}
					</div>
					<div>
						<Button icon='bring-data' text={'Import nml'} onClick={props.importNml} />
						<Button icon='floppy-disk' text={'Save'} onClick={props.save} />
					</div>
				</ButtonGroup>
			</div>
	)
}