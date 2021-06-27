import React, {useState, useEffect, PropsWithChildren} from 'react';

import styles, {css} from '../styles'
import Track from "../data/Track";
import TrackList from "../components/TrackList";
import CollectionActions from "./CollectionActions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function DJSet(props: PropsWithChildren<any> &
		{tracks:Track[], collectionTrackSelected:(track:Track) => void}) {

	const [tracks, setTracks] = useState(props.tracks)

	useEffect(() => {
		// console.log('collection: ', props.tracks)
		setTracks(props.tracks)
	},[props.tracks])

	// function trackSelected(track:Track) {
	// 	props.collectionTrackSelected(track)
	// }

	return (
			<div>
				<CollectionActions style={{}}/>
				<div style={{overflowY:'auto', height:props.height}}>
					<TrackList tracks={tracks} selected={(track:Track) => props.collectionTrackSelected(track)} />
				</div>
			</div>
	)


}