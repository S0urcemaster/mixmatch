import React, { PropsWithChildren } from 'react'
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any>
		& { nml:() => void }
):JSX.Element {
	return (
			<Menu className={props.className}>
				<MenuItem text="Playlist nml" icon="filter-list" onClick={props.nml} />
				<MenuItem text="Keys set" icon="filter-list" />
				<MenuItem text="Existing matches" icon="filter-list" />
				<MenuDivider/>
			</Menu>
	)
}