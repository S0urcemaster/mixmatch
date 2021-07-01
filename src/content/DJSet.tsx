import React, {useState, useEffect, PropsWithChildren} from 'react';

import styles, {css} from '../styles'
import Track from "../data/Track";
import Actions from "./DjSetActions";
import TrackList from '../components/TrackList'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function DJSet(props: PropsWithChildren<any> &
		{tracks:Track[], trackSelected:(track:Track) => void,
			importNml:() => void}) {
	
	useEffect(() => {
		true
	}, [])
	
	useEffect(() => {
		true
	}, [props.tracks])

	function filterNml() {
		true
	}

	return (
			<>
				<Actions style={{marginRight: 10}} filterNml={filterNml} importNml={props.importNml}
							save={props.save} />
				<div style={{...props.style}}>
					<TrackList tracks={props.tracks} selected={(track:Track) => props.trackSelected(track)} />
				</div>
			</>
	)


}