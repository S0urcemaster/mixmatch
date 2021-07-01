import React, {PropsWithChildren, useEffect, useState} from 'react'

import { Card, Divider, TextArea } from "@blueprintjs/core"

import styles, {css} from '../styles'
import Player from "../components/Player"
import Track from "../data/Track"
import GenreSelect from "../components/GenreSelect";

const padder:css = {
	padding:5,
}

export default function (props: PropsWithChildren<any> & {
	track:Track, loadChannel:string
	updateActiveNotes:(notes:number[]) => void,
	updateComment:(comment:string) => void,
}) {
	
	const [comment, setComment] = useState('')

	useEffect(() => {
		if(props.track.comment === undefined) {
			setComment('')
		}
		else {
			setComment(props.track.comment)
		}
	}, [props.track])
	
	function updateComment(c:string) {
		setComment(c)
		props.updateComment(c)
	}
	
	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex'}}>
					<h3 style={{...styles.detailsTitle}}>{props.track.title}</h3>
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
				<div style={{display:'flex', justifyContent:'space-between'}}>
					<table style={{...padder}} className='tagHorizontalTable'>
						<tbody>
						<tr>
							<td>BPM</td>
							<td>Key</td>
							<td>Length</td>
							<td>Genre</td>
						</tr>
						<tr>
							<td>{props.track.bpm}</td>
							<td>{props.track.key}</td>
							<td>{props.track.playtime}</td>
							<td><GenreSelect/></td>
						</tr>
						<tr>
						</tr>
						</tbody>
					</table>
					<TextArea
						growVertically={false}
						onChange={(event:any) => updateComment(event.target.value)}
						value={comment}
						style={{width:'50%'}}
					/>
				</div>
				<Divider style={{margin: 0}} />
				<Player track={props.track} loadChannel={props.loadChannel}
						  updateActiveNotes={(notes:number[]) => props.updateActiveNotes(notes)} />
			</Card>
	)
}