import React, {useState, PropsWithChildren} from 'react';

import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";

import { ItemRenderer } from "@blueprintjs/select";

// import styles, {css} from '../styles'
import { notes, INote } from '../data/Note'


const renderer:ItemRenderer<INote> = (note:INote, {handleClick}) => {
	return (
			<MenuItem key={note.value} text={note.name} onClick={handleClick}/>
	)
}

const NoteSelect = Select.ofType<INote>()

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({initialNote, ...restProps}: PropsWithChildren<any>) {

	const [note, setNote] = useState(initialNote ?? notes[12])

	const handleSelect = (newNote:INote) => {
		console.log("test: " +newNote)
		setNote(newNote)
	}

	return (
			<NoteSelect items={notes}
							itemRenderer = {renderer}
							onItemSelect = {handleSelect}
							filterable = {false}
							popoverProps = {{minimal: true}}
							inputProps = {restProps}
			>
				<Button
						// icon="film"
						rightIcon="caret-down"
						text={note.name}
				/>
			</NoteSelect>
	)

}