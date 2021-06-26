import React, {PropsWithChildren} from 'react';

import { Card, Divider, Button } from "@blueprintjs/core";

import NoteSelect from '../components/NoteSelect'
import { notes } from '../data/Note'
import styles, {css} from '../styles'

import '../App.css'
import GenreSelect from "../components/GenreSelect";
import MoodSelect from "../components/MoodSelect";

const padder:css = {
	padding:5,
}

export default function (props: PropsWithChildren<any> & {play:() => void}) {

	function play() {
		props.play()
	}

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>Let's Prance (Radio Slave & Thomas Gandey Last Communication Remix)</h3>
					<Button icon='play' onClick={play}/>
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagVerticalTable'>
					<tbody>
					<tr>
						<td>Artist</td>
						<td>Paul Woolford, Pamela Fernandez, Solardo</td>
					</tr>
					<tr>
						<td>Album</td>
						<td>Mistura - Do You Love Me? Feat. Angela Johnson (David Penn Remix)</td>
					</tr>
					</tbody>
				</table>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagHorizontalTable'>
					<tbody>
					<tr>
						<td>BPM</td>
						<td>Length</td>
						<td>Key</td>
						<td>Genre</td>
					</tr>
					<tr>
						<td>123</td>
						<td>10:00</td>
						<td>C#m</td>
						<td><GenreSelect/></td>
					</tr>
					<tr>
					</tr>
					</tbody>
				</table>
				<Divider style={{margin: 0}}/>
				<div style={{...padder, display:'flex', flexWrap:'wrap'}}>
					<div style={{display:'flex', flexDirection:'column',}}>
						<div>Mood 1</div>
						<MoodSelect/>
					</div>
					<div style={{display:'flex', flexDirection:'column',}}>
						<div>Mood 2</div>
						<MoodSelect/>
					</div>
					<div style={{display:'flex', flexDirection:'column',}}>
						<div>Mood 3</div>
						<MoodSelect/>
					</div>
					<div style={{display:'flex', flexDirection:'column',}}>
						<div>Mood 4</div>
						<MoodSelect/>
					</div>
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagHorizontalTable'>
					<tbody>
					<tr>
						<td>Base note</td>
						<td>Interval</td>
						<td>Chord</td>
						<td>Extension</td>
						<td>Complex</td>
					</tr>
					<tr>
						<td><NoteSelect initialNote={notes[0]}/></td>
						<td><NoteSelect initialNote={notes[4]}/></td>
						<td><NoteSelect initialNote={notes[7]}/></td>
						<td><NoteSelect initialNote={null}/></td>
						<td><NoteSelect initialNote={null}/></td>
					</tr>
					<tr>
					</tr>
					</tbody>
				</table>
			</Card>
	)
}