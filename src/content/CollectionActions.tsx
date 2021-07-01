import React, {PropsWithChildren} from 'react'

import { Alignment, Button, ButtonGroup, H5, IconName } from "@blueprintjs/core"
import { Popover2 } from "@blueprintjs/popover2"

import { notes } from '../data/Note'
import styles, {css} from '../styles'

import '../App.css'
import FilterMenu from "./FilterMenu";
import CollectionFilterMenu from './CollectionFilterMenu'

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
		{save:() => void, reimport:() => void, importNml:() => void}
): JSX.Element {

	return (
			<div style={{backgroundColor:'white'}}>
				<ButtonGroup style={{ minWidth: 120, display:'flex', justifyContent:'space-between' }}>
					<div>
						<Popover2 transitionDuration={0} content={<CollectionFilterMenu importNml={props.importNml}/>}
									 placement="bottom-start">
							<Button rightIcon="caret-down" icon='filter' text={'Filter'} />
						</Popover2>
						{renderButton("Sort", "edit")}
						{renderButton("View", "eye-open")}
					</div>
					<div>
						<Button disabled={false} icon='download' text={'Re-import'} onClick={props.reimport} />
						<Button icon='floppy-disk' text={'Save'} onClick={props.save} />
					</div>
				</ButtonGroup>
			</div>
	)
}