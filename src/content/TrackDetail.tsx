import React, {PropsWithChildren, useEffect} from 'react'

import { Card, Divider, Button, Spinner } from "@blueprintjs/core"

import styles, {css} from '../styles'
import Player from "../components/Player"
import Track from "../data/Track"

const padder:css = {
	padding:5,
}

export default function (props: PropsWithChildren<any> & {
	track:Track, play:() => void, playing:boolean, loading:boolean}) {

	function play() {
		props.play()
	}

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>{props.track.title}</h3>
					{/*<Button icon={<Spinner />} onClick={play} />*/}
					<Button icon={props.loading ? <Spinner size={15} /> : props.playing ? 'pause' :'play'} onClick={play} />
				</div>
				<Divider style={{margin: 0}}/>
				<table style={{...padder}} className='tagVerticalTable'>
					<tbody>
					<tr>
						<td>Artist</td>
						<td>{props.track.artist}</td>
					</tr>
					<tr>
						<td>Album</td>
						<td>{props.track.album}</td>
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
						<td>{props.track.bpm}</td>
						<td>{props.track.playtime}</td>
						<td>{props.track.initial_key}</td>
						<td>{props.track.genre}</td>
						<td>{props.track.mood}</td>
					</tr>
					<tr>
					</tr>
					</tbody>
				</table>
				<Divider style={{margin: 0}} />
				<Player track={props.track} />
			</Card>
	)
}