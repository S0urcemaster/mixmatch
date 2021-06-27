import React, {useState, useEffect, PropsWithChildren} from 'react'

import Track from "../data/Track"

import baseStyles, {css} from '../styles'

const styles = {
	element: {
		backgroundColor: 'white',
		margin:1,
		padding:'2px 2px 2px 4px',
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
		{ tracks: Track[], selected:(track:Track) => void }) {

	// const [tracks, setTracks] = useState([])
	const tracks = props.tracks

	function click(track:Track) {
		props.selected(track)
	}

	return (
			<>
				{tracks.map((track: Track) =>
						<div key={track.file} style={{...styles.element}} onClick={() => click(track)}>
							<div style={{...styles.titleText}}>{track.title}</div>
							<div style={{...styles.plainText}}>{track.artist}</div>
							<div style={{...styles.horizontalList}}>
								<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.bpm} bpm</div>
								<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.key}</div>
								<div style={{...styles.plainText, ...styles.horizontalItem}}>{track.genre}</div>
							</div>
						</div>
				)}
			</>
	)

}