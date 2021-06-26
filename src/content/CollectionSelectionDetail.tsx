import React, {PropsWithChildren} from 'react';

import { Card, Divider, Button } from "@blueprintjs/core";

import styles, {css} from '../styles'
import GenreSelect from "../components/GenreSelect";
import NoteSelect from "../components/NoteSelect";
import {notes} from "../data/Note";
import Track from "../data/Track";

const padder:css = {
	padding:5,
}

export default function (props: PropsWithChildren<any> & {selected:Track, play:() => void}) {

	const selected = props.selected

	function play() {
		props.play()
	}

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>{selected.title}</h3>
					<Button icon='play' onClick={play} />
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagVerticalTable'>
					<tbody>
					<tr>
						<td>Artist</td>
						<td>{selected.artist}</td>
					</tr>
					<tr>
						<td>Album</td>
						<td>{selected.album}</td>
					</tr>
					</tbody>
				</table>
				<table style={{...padder}} className='tagHorizontalTable'>
					<tbody>
					<tr>
						<td>BPM</td>
						<td>Length</td>
						<td>Key</td>
						<td>Genre</td>
						<td>Mood</td>
					</tr>
					<tr>
						<td>{selected.bpm}</td>
						<td>{selected.playtime}</td>
						<td>{selected.initial_key}</td>
						<td>{selected.genre}</td>
						<td>{selected.mood}</td>
					</tr>
					<tr>
					</tr>
					</tbody>
				</table>
				<Divider style={{margin:0}}></Divider>
				<div style={{display:'flex', justifyContent:'space-between', ...padder}}>
					<div>
						<NoteSelect initialNote={notes[0]}/>
						<NoteSelect initialNote={notes[4]}/>
						<NoteSelect initialNote={notes[7]}/>
						<NoteSelect initialNote={null}/>
						<NoteSelect initialNote={null}/>
					</div>
					<Button icon='play'></Button>
				</div>
			</Card>
	)
}