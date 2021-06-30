import React, {useState, useEffect, PropsWithChildren} from 'react';
import {Colors} from "@blueprintjs/core";

import styles, {css} from '../styles'
import {notes, INote} from '../data/Note'


const note: css = {
	backgroundColor: Colors.LIGHT_GRAY4,
	width: 20,
	height: 32,
	margin: 1,
	cursor: 'pointer',
	textAlign: 'center',
}

const noteSpacer: css = {
	width: 20,
	height: 32,
	margin: 1,
}

const keySelectedColor = Colors.GRAY4
const keyColor = Colors.LIGHT_GRAY2

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any> &
		{ activeNotes:number[],
			updateActiveNotes: (notes: number[]) => void, updateTempNote: number }):JSX.Element {
	
	const notesActive = [
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
	]
	
	const [notesSelected, setNotesSelected] = useState([])
	
	useEffect(() => {
		notesActive.forEach(na => false)
		props.activeNotes.forEach((n: number) => {
			notesActive[n] = true
		})
		setNotesSelected([...notesActive])
	}, [props.activeNotes])
	
	function noteToggle(i: number) {
		notesActive[i] = !notesActive[i]
		if (notesActive[i]) {
			const notes = [...props.activeNotes]
			const sort = notes.concat(i).sort()
			props.updateActiveNotes(sort)
		} else {
			const remaining = [...props.activeNotes]
			remaining.splice(props.activeNotes.indexOf(i), 1)
			props.updateActiveNotes(remaining)
		}
	}
	
	function notePlay(i: number) {
		props.updateTempNote(i)
	}
	
	return (
			<div>
				<div style={{display: 'flex'}}>
					<div style={{...noteSpacer, width: 10}}/>
					{[[1, 'C#'], [3, 'D#']].map(([i, n]) =>
							<div key={i} style={{...note, backgroundColor: notesSelected[i as number] ? keySelectedColor : keyColor}}
								  onContextMenu={() => noteToggle(i as number)} onMouseDown={() => notePlay(i as number)}
								  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>{n}
							</div>)
					}
					<div style={{...noteSpacer}}/>
					{[[6, 'F#'], [8, 'G#'], [10, 'A#']].map(([i, n]) =>
							<div key={i} style={{...note, backgroundColor: notesSelected[i as number] ? keySelectedColor : keyColor}}
								  onContextMenu={() => noteToggle(i as number)} onMouseDown={() => notePlay(i as number)}
								  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>{n}
							</div>)
					}
					<div style={{...noteSpacer}}/>
					{[[13, 'C#'], [15, 'D#']].map(([i, n]) =>
							<div key={i} style={{...note, backgroundColor: notesSelected[i as number] ? keySelectedColor : keyColor}}
								  onContextMenu={() => noteToggle(i as number)} onMouseDown={() => notePlay(i as number)}
								  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>{n}
							</div>)
					}
					<div style={{...noteSpacer}}/>
					{[[18, 'F#'], [20, 'G#'], [22, 'A#']].map(([i, n]) =>
							<div key={i} style={{...note, backgroundColor: notesSelected[i as number] ? keySelectedColor : keyColor}}
								  onContextMenu={() => noteToggle(i as number)} onMouseDown={() => notePlay(i as number)}
								  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>{n}
							</div>)
					}
				</div>
				<div style={{display: 'flex'}}>
					{[[0, 'C'], [2, 'D'], [4, 'E'], [5, 'F'], [7, 'G'], [9, 'A'], [11, 'B'],
						[12, 'C'], [14, 'D'], [16, 'E'], [17, 'F'], [19, 'G'], [21, 'A'], [23, 'B']
					].map(([i, n]) =>
							<div key={i} style={{...note, backgroundColor: notesSelected[i as number] ? keySelectedColor : keyColor}}
								  onContextMenu={() => noteToggle(i as number)} onMouseDown={() => notePlay(i as number)}
								  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>{n}
							</div>)
					}
				</div>
			</div>
	)
}