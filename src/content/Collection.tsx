import React, {useState, useEffect, PropsWithChildren} from 'react';

import styles, {css} from '../styles'
import Track from "../data/Track";
import TrackList from "../components/TrackList";
import CollectionActions from "./CollectionActions";
import com from '../main/processcom'
import * as lib from '../lib/lib'

declare const window: any

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (props: PropsWithChildren<any> &
		{tracks:Track[], trackSelected:(track:Track) => void, save:() => void, reimport:() => void
		}) {
	
	useEffect(() => {
		window.api.receive(com.pick_collection_nml_file, (data:string) => filePicked(data))
		window.api.receive(com.read_collection_nml, (data:string) => nmlRed(data))
	}, [])
	
	const [whiteFilters, setWhiteFilters] = useState<Track[][]>([])
	const [blackFilters, setBlackFilters] = useState<Track[][]>([])
	
	function filePicked(filename:string) {
		window.api.send(com.read_collection_nml, filename)
	}
	
	function nmlRed(data:any) {
		setWhiteFilters([...whiteFilters, lib.fromNml(data)])
	}
	
	function filterNml() {
		true
	}
	
	function importNml() {
		window.api.send(com.pick_collection_nml_file)
	}
	
	return (
			<>
				<CollectionActions save={props.save} reimport={props.reimport} importNml={importNml} />
				<div style={{...props.style}}>
					<TrackList tracks={props.tracks} selected={(track:Track) => props.trackSelected(track)}
								  whiteFilters={whiteFilters} blackFilters={blackFilters}
					/>
				</div>
			</>
	)


}