import React, {useState, useEffect, PropsWithChildren} from 'react';
import { Colors } from "@blueprintjs/core";

import styles, {css} from '../styles'
import { notes, INote } from '../data/Note'


const note:css = {
	backgroundColor:Colors.LIGHT_GRAY4,
	width:20,
	height:32,
	margin:1,
	cursor:'pointer',
	textAlign:'center',
}

const noteSpacer:css = {
	width:20,
	height:32,
	margin:1,
}

const keySelectedColor = Colors.GRAY4
const keyColor = Colors.LIGHT_GRAY2

interface KeysValues {
	c1:boolean, cis1:boolean, d1:boolean, dis1:boolean, e1:boolean, f1:boolean, fis1:boolean, g1:boolean,
	gis1:boolean, a1:boolean, ais1:boolean, b1:boolean, c2:boolean, cis2:boolean, d2:boolean, dis2:boolean,
	e2:boolean, f2:boolean, fis2:boolean, g2:boolean, gis2:boolean, a2:boolean, ais2:boolean, b2:boolean,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any> &
		{activeFrequencies:(fs:[]) => void, octave:number}) {

	const [notesActive, setNotesActive] = useState([
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
		false, false, false, false, false, false, false, false,
	])

	const [fNoteC, setFNoteC] = useState(16.35)
	const [activeNotes, setActiveNotes] = useState<number[]>([])

	useEffect(() => {
		props.activeFrequencies(activeNotes)
	},[activeNotes])

	function noteToggle(i:number) {
		notesActive[i] = !notesActive[i]
		if(notesActive[i]) {
			setActiveNotes(activeNotes.concat(getFrequency(i)).sort())
		}
		else {
			activeNotes.splice(activeNotes.indexOf(getFrequency(i)), 1)
			setActiveNotes([...activeNotes])
		}
		setNotesActive([...notesActive])
	}

	function getFrequency(inter:number) {
		return fNoteC *((2 **(1 /12)) **(inter + props.octave *12))
	}

	function notePlay(i:number) {
		i = 0
	}

	return (
			<div>
				<div style={{display: 'flex'}}>
					<div style={{...noteSpacer, width:10}} />
					<div style={{...note, backgroundColor:notesActive[1] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(1)} onMouseDown={() => notePlay(1)} onMouseUp={() => notePlay(1)} onMouseLeave={() => notePlay(1)}>C#</div>
					<div style={{...note, backgroundColor:notesActive[3] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(3)}>D#</div>
					<div style={{...noteSpacer}} />
					<div style={{...note, backgroundColor:notesActive[6] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(6)}>F#</div>
					<div style={{...note, backgroundColor:notesActive[8] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(8)}>G#</div>
					<div style={{...note, backgroundColor:notesActive[10] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(10)}>A#</div>
					<div style={{...noteSpacer}} />
					<div style={{...note, backgroundColor:notesActive[13] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(13)}>C#</div>
					<div style={{...note, backgroundColor:notesActive[15] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(15)}>D#</div>
					<div style={{...noteSpacer}} />
					<div style={{...note, backgroundColor:notesActive[18] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(18)}>F#</div>
					<div style={{...note, backgroundColor:notesActive[20] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(20)}>G#</div>
					<div style={{...note, backgroundColor:notesActive[22] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(22)}>A#</div>
				</div>
				<div style={{display: 'flex'}}>
					<div style={{...note, backgroundColor:notesActive[0] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(0)}>C</div>
					<div style={{...note, backgroundColor:notesActive[2] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(2)}>D</div>
					<div style={{...note, backgroundColor:notesActive[4] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(4)}>E</div>
					<div style={{...note, backgroundColor:notesActive[5] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(5)}>F</div>
					<div style={{...note, backgroundColor:notesActive[7] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(7)}>G</div>
					<div style={{...note, backgroundColor:notesActive[9] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(9)}>A</div>
					<div style={{...note, backgroundColor:notesActive[11] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(11)}>B</div>
					<div style={{...note, backgroundColor:notesActive[12] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(12)}>C</div>
					<div style={{...note, backgroundColor:notesActive[14] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(14)}>D</div>
					<div style={{...note, backgroundColor:notesActive[16] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(16)}>E</div>
					<div style={{...note, backgroundColor:notesActive[17] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(17)}>F</div>
					<div style={{...note, backgroundColor:notesActive[19] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(19)}>G</div>
					<div style={{...note, backgroundColor:notesActive[21] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(21)}>A</div>
					<div style={{...note, backgroundColor:notesActive[23] ? keySelectedColor :keyColor}} onContextMenu={() => noteToggle(23)}>B</div>
				</div>
			</div>
	)
}