import React, {useState, useEffect, PropsWithChildren} from 'react';

import styles, {css} from '../styles'
import Track from "../data/Track";
import TrackList from "../components/TrackList";
import CollectionActions from "./CollectionActions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Collection(props: PropsWithChildren<any> &
		{tracks:Track[], trackSelected:(track:Track) => void}) {

	const [tracks, setTracks] = useState(props.tracks)

	useEffect(() => {
		setTracks(props.tracks)
	},[props.tracks])

	return (
			<div>
				<CollectionActions style={{}}/>
				<div style={{overflowY:'auto', height:props.height}}>
					<TrackList tracks={tracks} selected={(track:Track) => props.trackSelected(track)} />
				</div>
			</div>
	)


}