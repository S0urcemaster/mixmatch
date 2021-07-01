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
	},[collection])

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
		// console.log(notes)
		selectedZetTrack.keys = notes
		// console.log(collection)
	}
	
	function setZetComment(comment:string) {
		// console.log(comment)
		selectedZetTrack.comment = comment
		// console.log(collection)
		// setSelectedZetTrack({...selectedZetTrack, comment:comment})
	}
	
	function setCollectionComment(comment:string) {
		selectedZetTrack.comment = comment
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
					/>
					<TrackDetail style={{marginBottom:10}} track={selectedCollectionTrack} loadChannel={'right'}
									 updateActiveNotes={(notes:number[]) => setActiveCollectionNotes(notes)}
									 updateComment={(comment:string) => setCollectionComment(comment)}
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
