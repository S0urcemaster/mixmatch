import React, {PropsWithChildren} from 'react';

import { Card, Divider, Button } from "@blueprintjs/core";

import styles, {css} from '../styles'
import GenreSelect from "../components/GenreSelect";
import NoteSelect from "../components/NoteSelect";
import {notes} from "../data/Note";

const padder:css = {
	padding:5,
}

export default function SetSelectionDetail(props: PropsWithChildren<any>) {

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>Someone in the Sky (feat. Sutja Gutierrez) (Periodear Remix)</h3>
					<Button icon='play'></Button>
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagVerticalTable'>
					<tbody>
					<tr>
						<td>Artist</td>
						<td>Affkt, Sutja Gutierrez</td>
					</tr>
					<tr>
						<td>Album</td>
						<td>Mistura - Do You Love Me? Feat. Angela Johnson (David Penn Remix)</td>
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
						<td>123</td>
						<td>10:00</td>
						<td>C#m</td>
						<td><GenreSelect></GenreSelect></td>
						<td>Techno (Peak Time / Driving / Hard)</td>
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