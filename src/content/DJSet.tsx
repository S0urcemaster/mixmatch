import React, {useState, useEffect, PropsWithChildren} from 'react';

import styles, {css} from '../styles'
import Track from "../data/Track";
import SetActions from "./DjSetActions";
import TrackList from '../components/TrackList'

interface IDJSetTable {
	columns?: JSX.Element[];
	data?: any[];
	enableColumnInteractionBar?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function DJSet(props: PropsWithChildren<any> &
		{tracks:Track[], trackSelected:(track:Track) => void}) {
	
	useEffect(() => {
		true
	}, [])
	
	useEffect(() => {
		true
	}, [props.tracks])


	return (
			<>
				<SetActions style={{marginRight: 10}}/>
				<div style={{overflowY:'auto'}}>
					<TrackList tracks={props.tracks} selected={(track:Track) => props.trackSelected(track)} />
				</div>
			</>
	)


}