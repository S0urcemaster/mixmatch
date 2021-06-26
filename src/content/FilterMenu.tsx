import React, { PropsWithChildren } from 'react'
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any>) {
	return (
			<Menu className={props.className}>
				<MenuItem text="New" icon="document" {...props} />
				<MenuItem text="Open" icon="folder-shared" {...props} />
				<MenuItem text="Close" icon="add-to-folder" {...props} />
				<MenuDivider/>
				<MenuItem text="Save" icon="floppy-disk" {...props} />
				<MenuItem text="Save as..." icon="floppy-disk" {...props} />
				<MenuDivider/>
				<MenuItem text="Exit" icon="cross" {...props} />
			</Menu>
	)
}