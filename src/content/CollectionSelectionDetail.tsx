import React, {PropsWithChildren} from 'react'

import { Card, Divider, Button, Spinner } from "@blueprintjs/core"

import styles, {css} from '../styles'
import Player from "../components/Player"
import Track from "../data/Track"

const padder:css = {
	padding:5,
}

export default function (props: PropsWithChildren<any> & {
	selected:Track, play:() => void, playing:boolean, loading:boolean}) {

	function play() {
		props.play()
	}

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>{props.selected.title}</h3>
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagVerticalTable'>
					<tbody>
					<tr>
						<td>Artist</td>
						<td>{props.selected.artist}</td>
					</tr>
					<tr>
						<td>Album</td>
						<td>{props.selected.album}</td>
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
						<td>{props.selected.bpm}</td>
						<td>{props.selected.playtime}</td>
						<td>{props.selected.initial_key}</td>
						<td>{props.selected.genre}</td>
						<td>{props.selected.mood}</td>
					</tr>
					<tr>
					</tr>
					</tbody>
				</table>
				<Divider style={{margin: 0}} />
				<Player track={props.selected} />
			</Card>
	)
}