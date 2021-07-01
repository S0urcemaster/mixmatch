import React, { PropsWithChildren } from 'react'
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any>
		& { importNml:() => void }
):JSX.Element {
	return (
			<Menu className={props.className}>
				<MenuItem text="Playlist nml" icon="bring-data" onClick={props.importNml} />
				<MenuItem text="Keys set" icon="filter-list" />
				<MenuItem text="Existing matches" icon="filter-list" />
				<MenuDivider/>
			</Menu>
	)
}