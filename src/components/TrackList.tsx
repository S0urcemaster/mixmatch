import React, {useState, useEffect, PropsWithChildren} from 'react'

import Track from "../data/Track"

import baseStyles, {css} from '../styles'
import * as lib from '../lib/lib'

const styles = {
	element: {
		backgroundColor: 'white',
		margin:1,
		padding:'2px 6px 2px 4px',
	},
	titleText: {
		fontWeight:'bold',
	} as css,
	plainText: {
	},
	horizontalList: {
		display: 'flex',
	},
	horizontalItem: {
		paddingRight:5,
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any> &
		{ tracks: Track[], selected:(track:Track) => void,
		}):JSX.Element {

	// const [tracks, setTracks] = useState([])
	const tracks = props.tracks

	function click(track:Track) {
		props.selected(track)
	}

	return (
			<>
				{tracks.map((track: Track) =>
						<div key={track.file} style={{...styles.element}} onClick={() => click(track)}>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{...styles.titleText}}>{track.title}</div>
								<div style={{...styles.titleText, color:'#c40000'}}>{track.trackMatches.length}</div>
							</div>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{...styles.plainText}}>{track.artist}</div>
								<div style={{...styles.plainText, width:'50%', overflow:'hidden', textAlign:'right'}}>{track.comment}</div>
							</div>
							<div style={{display:'flex', justifyContent:'space-between'}}>
								<div style={{...styles.horizontalList}}>
									<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.bpm} bpm</div>
									<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.key}</div>
									<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.genre}</div>
								</div>
								<div style={{display:'flex'}}>
									{track.keys.map((k,i) =>
											<div style={{fontWeight:i == 0 ? 'bold' : 'normal', paddingLeft:10}} key={k}>{lib.getKeyName(k)}</div>
									)}
								</div>
							</div>
						</div>
				)}
			</>
	)

}