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
		{ activeFrequencies: (fs: number[]) => void, octave: number, tempFrequency: number }) {
	
	const [notesActive, setNotesActive] = useState([
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
	])
	
	const [fNoteC, setFNoteC] = useState(16.35)
	const [activeNotes, setActiveNotes] = useState<number[]>([])
	
	useEffect(() => {
		props.activeFrequencies(activeNotes)
	}, [activeNotes])
	
	function noteToggle(i: number) {
		notesActive[i] = !notesActive[i]
		if (notesActive[i]) {
			setActiveNotes(activeNotes.concat(getFrequency(i)).sort())
		} else {
			activeNotes.splice(activeNotes.indexOf(getFrequency(i)), 1)
			setActiveNotes([...activeNotes])
		}
		setNotesActive([...notesActive])
	}
	
	function getFrequency(inter: number) {
		return fNoteC * ((2 ** (1 / 12)) ** (inter + props.octave * 12))
	}
	
	function notePlay(i: number) {
		props.tempFrequency(getFrequency(i))
	}
	
	return (
			<div>
				<div style={{display: 'flex'}}>
					<div style={{...noteSpacer, width: 10}}/>
					<div style={{...note, backgroundColor: notesActive[1] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(1)} onMouseDown={() => notePlay(1)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>C#
					</div>
					<div style={{...note, backgroundColor: notesActive[3] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(3)} onMouseDown={() => notePlay(3)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>D#
					</div>
					<div style={{...noteSpacer}}/>
					<div style={{...note, backgroundColor: notesActive[6] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(6)} onMouseDown={() => notePlay(6)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>F#
					</div>
					<div style={{...note, backgroundColor: notesActive[8] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(8)} onMouseDown={() => notePlay(8)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>G#
					</div>
					<div style={{...note, backgroundColor: notesActive[10] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(10)} onMouseDown={() => notePlay(10)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>A#
					</div>
					<div style={{...noteSpacer}}/>
					<div style={{...note, backgroundColor: notesActive[13] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(13)} onMouseDown={() => notePlay(13)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>C#
					</div>
					<div style={{...note, backgroundColor: notesActive[15] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(15)} onMouseDown={() => notePlay(15)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>D#
					</div>
					<div style={{...noteSpacer}}/>
					<div style={{...note, backgroundColor: notesActive[18] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(18)} onMouseDown={() => notePlay(18)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>F#
					</div>
					<div style={{...note, backgroundColor: notesActive[20] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(20)} onMouseDown={() => notePlay(20)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>G#
					</div>
					<div style={{...note, backgroundColor: notesActive[22] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(22)} onMouseDown={() => notePlay(22)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>A#
					</div>
				</div>
				<div style={{display: 'flex'}}>
					<div style={{...note, backgroundColor: notesActive[0] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(0)} onMouseDown={() => notePlay(0)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>C
					</div>
					<div style={{...note, backgroundColor: notesActive[2] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(2)} onMouseDown={() => notePlay(2)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>D
					</div>
					<div style={{...note, backgroundColor: notesActive[4] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(4)} onMouseDown={() => notePlay(4)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>E
					</div>
					<div style={{...note, backgroundColor: notesActive[5] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(5)} onMouseDown={() => notePlay(5)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>F
					</div>
					<div style={{...note, backgroundColor: notesActive[7] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(7)} onMouseDown={() => notePlay(7)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>G
					</div>
					<div style={{...note, backgroundColor: notesActive[9] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(9)} onMouseDown={() => notePlay(9)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>A
					</div>
					<div style={{...note, backgroundColor: notesActive[11] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(11)} onMouseDown={() => notePlay(11)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>B
					</div>
					<div style={{...note, backgroundColor: notesActive[12] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(12)} onMouseDown={() => notePlay(12)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>C
					</div>
					<div style={{...note, backgroundColor: notesActive[14] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(14)} onMouseDown={() => notePlay(14)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>D
					</div>
					<div style={{...note, backgroundColor: notesActive[16] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(16)} onMouseDown={() => notePlay(16)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>E
					</div>
					<div style={{...note, backgroundColor: notesActive[17] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(17)} onMouseDown={() => notePlay(17)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>F
					</div>
					<div style={{...note, backgroundColor: notesActive[19] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(19)} onMouseDown={() => notePlay(19)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>G
					</div>
					<div style={{...note, backgroundColor: notesActive[21] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(21)} onMouseDown={() => notePlay(21)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>A
					</div>
					<div style={{...note, backgroundColor: notesActive[23] ? keySelectedColor : keyColor}}
						  onContextMenu={() => noteToggle(23)} onMouseDown={() => notePlay(23)}
						  onMouseUp={() => notePlay(undefined)} onMouseLeave={() => notePlay(undefined)}>B
					</div>
				</div>
			</div>
	)
}