// import { contextBridge } from 'electron'

import React, {useEffect, useState} from 'react';

import { Button, Divider } from "@blueprintjs/core";

import './App.css'

import styles, {css} from './styles'

import { useWindowSize } from './lib/WindowSizeHook'
import * as lib from './lib/lib'

import com from './main/processcom'
import Track from "./data/Track"
import Data from "./data/Collection"

import DJSet from "./content/DJSet";
import Collection from "./content/Collection"
import TrackDetail from "./content/TrackDetail"
import PageHeader from "./content/PageHeader";
import DJZetHeader from "./content/DJSetHeader";
import CollectionHeader from "./content/CollectionHeader";
import Match from './data/Match'


const app:css = {
	maxHeight:'84vh',
	height:'84vh',
}

const headerRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const detailsRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const tableRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const tableRowItem:css = {
	flex:'1 1 auto',
	height:'90%'
	// width:'100%',
}

declare const window: any

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

	const [width, height] = useWindowSize();

	useEffect(() => {
		// console.log(width, height)
	},[width, height])

	const [zet, setZet] = useState([])
	const [collection, setCollection] = useState([])
	const [selectedCollectionTrack, setSelectedCollectionTrack] = useState({...new Track(), title:'No Track'})
	const [selectedZetTrack, setSelectedZetTrack] = useState({...new Track(), title:'No Track'})
	const [zetMatch, setZetMatch] = useState(undefined)
	const [collectionMatch, setCollectionMatch] = useState(undefined)

	useEffect(() => {
		window.api.receive(com.pick_file, (data:string) => filePicked(data))
		window.api.receive(com.read_zet_nml, (data:string) => nmlRed(data))
		window.api.receive(com.read_collection, (data:any) => collectionRed(data.pop()))
		window.api.receive(com.read_collection_nml, (data:any) => collectionNmlRed(data))
		window.api.receive(com.save_collection, () => collectionSaved())
		window.api.send(com.read_collection, undefined)
	},[])
	
	useEffect(() => {
		if(selectedZetTrack.title !== 'No Track') {
			setSelectedZetTrack(lib.findByTitle(collection, selectedZetTrack.title))
		}
		if(selectedCollectionTrack.title !== 'No Track') {
			setSelectedCollectionTrack(lib.findByTitle(collection, selectedCollectionTrack.title))
		}
		propagateMatches()
	},[collection])
	
	// useEffect(() => {
	// 	console.log('upd')
	// 	propagateMatches()
	// },[selectedZetTrack.trackMatches])

	function importNml() {
		window.api.send(com.pick_file, undefined)
	}

	function collectionRed(data:any) {
		setCollection(data)
	}

	function collectionNmlRed(data:any) {
		setCollection(lib.fromNml(data))
	}

	function filePicked(filename:string) {
		window.api.send(com.read_zet_nml, filename)
	}

	function nmlRed(data:any) {
		setZet(lib.fromNml(data))
	}
	
	function saveCollection() {
		lib.saveCollection(collection)
	}
	
	function collectionSaved() {
		window.api.send(com.read_collection, undefined)
	}
	
	function reimportCollection() {
		window.api.send(com.read_collection_nml, 'all.nml')
	}
	
	function setActiveCollectionNotes(notes:number[]) {
		selectedCollectionTrack.keys = notes
	}
	
	function setActiveZetNotes(notes:number[]) {
		selectedZetTrack.keys = notes
	}
	
	function setZetComment(comment:string) {
		selectedZetTrack.comment = comment
	}
	
	function setCollectionComment(comment:string) {
		selectedZetTrack.comment = comment
	}
	
	function updateZetMatch(match:number) {
		console.log('upd', match)
		const exist = lib.findMatch(selectedCollectionTrack.trackMatches, selectedZetTrack.title)
		if(exist) {
			if(match === 0) {
				selectedCollectionTrack.trackMatches.splice(selectedCollectionTrack.trackMatches.indexOf(exist), 1)
			}
			else {
				exist.value = match
			}
		}
		else {
			selectedCollectionTrack.trackMatches.push({title:selectedZetTrack.title, value:match})
		}
		console.log('upd', selectedCollectionTrack.trackMatches)
		// if(selectedCollectionTrack && selectedZetTrack.title)
		// setZetMatch(lib.findMatch(selectedCollectionTrack.trackMatches, selectedZetTrack.title))
		propagateMatches()
	}
	
	function updateCollectionMatch(match:number) {
		console.log('upd', match)
		const exist = lib.findMatch(selectedZetTrack.trackMatches, selectedCollectionTrack.title)
		if(exist) {
			if(match === 0) {
				selectedZetTrack.trackMatches.splice(selectedZetTrack.trackMatches.indexOf(exist), 1)
			}
			else {
				exist.value = match
			}
		}
		else {
			selectedZetTrack.trackMatches.push({title:selectedCollectionTrack.title, value:match})
		}
		console.log('upd', selectedZetTrack.trackMatches)
		propagateMatches()
	}
	
	function getMatch(track:Track, title:string) {
		if(track.title !== 'No Track') {
			return lib.findMatch(track.trackMatches, title)
		}
		return undefined
	}
	
	function propagateMatches() {
		if(selectedZetTrack && selectedZetTrack.title !== 'No Track' &&
				selectedCollectionTrack && selectedCollectionTrack.title !== 'No Track') {
			setZetMatch(lib.findMatch(selectedCollectionTrack.trackMatches, selectedZetTrack.title))
			setCollectionMatch(lib.findMatch(selectedZetTrack.trackMatches, selectedCollectionTrack.title))
			console.log('zet', lib.findMatch(selectedZetTrack.trackMatches, selectedCollectionTrack.title))
			console.log('col', lib.findMatch(selectedCollectionTrack.trackMatches, selectedZetTrack.title))
		}
	}
	
	return (
			<div style={{...app, height:height}}>
				<PageHeader/>
				{/*<Divider style={{margin: 0}}/>*/}
				{/*<div style={{...headerRow}}>*/}
				{/*	<DJZetHeader />*/}
				{/*	<CollectionHeader />*/}
				{/*</div>*/}
				<div style={{...detailsRow}}>
					<TrackDetail style={{marginRight:10, marginBottom:10}} track={selectedZetTrack} loadChannel={'left'}
									 updateActiveNotes={(notes:number[]) => setActiveZetNotes(notes)}
									 updateComment={(comment:string) => setZetComment(comment)}
									 updateMatch={(match:number) => updateZetMatch(match)}
									 match={zetMatch}
									 opposingLoaded={selectedCollectionTrack && selectedCollectionTrack.title !== 'No Track'}
									 propagateMatches={propagateMatches}
					/>
					<TrackDetail style={{marginBottom:10}} track={selectedCollectionTrack} loadChannel={'right'}
									 updateActiveNotes={(notes:number[]) => setActiveCollectionNotes(notes)}
									 updateComment={(comment:string) => setCollectionComment(comment)}
									 updateMatch={(match:number) => updateCollectionMatch(match)}
									 match={collectionMatch}
									 opposingLoaded={selectedZetTrack && selectedZetTrack.title !== 'No Track'}
									 propagateMatches={propagateMatches}
					/>
				</div>
				<div style={{...tableRow }}>
					<div style={{...tableRowItem, width:0, marginRight:10, height:height -450, overflowY:'auto'}}>
						<DJSet tracks={collection} trackSelected={(track:Track) => setSelectedZetTrack(track)}
								 style={{height:height -490, overflowY:'auto'}}
								 importNml={importNml} save={saveCollection}
						/>
					</div>
					<div style={{...tableRowItem, width:0}}>
						<Collection tracks={collection} save={saveCollection} reimport={reimportCollection}
										trackSelected={(track:Track) => setSelectedCollectionTrack(track)}
										style={{height:height -490, overflowY:'auto'}}/>
					</div>
				</div>
			</div>
	)
}

export default App
