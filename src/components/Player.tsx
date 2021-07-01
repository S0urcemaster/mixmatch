import React, { PropsWithChildren, useState, useEffect } from 'react';

import { Divider, Button, Slider, RangeSlider, NumberRange, Spinner, HTMLSelect } from "@blueprintjs/core";

import styles, {css} from '../styles'
import Track from "../data/Track"
import com from "../main/processcom";
import Keys from "../components/Keys";
import * as lib from '../lib/lib'
import {calcFrequency} from '../lib/lib'
import Match from '../data/Match'

declare const window: any;

const padder: css = {
	padding: 5,
}

const audioCtx = new AudioContext()

export default function (props: PropsWithChildren<any> & {
	track:Track, audioCtx:AudioContext, loadChannel:string,
	updateActiveNotes:(notes:number[]) => void,
	updateMatch:(match:number) => void,
	propagateMatches:() => void,
	match:Match,
	opposingLoaded:boolean,
}):JSX.Element {
	
	// keep in memory after decoding:
	const [audioBuffer, setAudioBuffer] = useState(null)
	
	// start and later stop
	const [audioNode, setAudioNode] = useState(null)
	
	// never changes
	const [audioGainNode] = useState(audioCtx.createGain())
	const [oscGainNode] = useState(audioCtx.createGain())
	
	const [oscs, setOscs] = useState([])
	const [tempOsc, setTempOsc] = useState(null)

	const [audioGain, setAudioGain] = useState(100)
	const [audioLength, setAudioLength] = useState(300)
	const [playRange, setPlayRange] = useState([0, audioLength] as NumberRange)
	const [audioPlaying, setAudioPlaying] = useState(false)
	const [audioLoading, setAudioLoading] = useState(false)
	const [oscPlaying, setOscPlaying] = useState(false)
	const [oscGain, setOscGain] = useState(50)
	const [octave, setOctave] = useState(4)
	
	const [activeNotes, setActiveNotes] = useState([])
	const [tempNote, setTempNote] = useState(undefined)
	
	// the actual match value between two tracks
	const [match, setMatch] = useState(0)
	
	useEffect(() => {
		window.api.receive(com.read_mp3 +props.loadChannel, (data:any) => mp3Red(data.pop()))
		oscGainNode.connect(audioCtx.destination)
		audioGainNode.connect(audioCtx.destination)
	},[])
	
	useEffect(() => {
		props.updateActiveNotes(activeNotes)
	},[activeNotes])
	
	useEffect(() => {
		console.log('props.match', props.match)
		if(props.match) {
			setMatch(props.match.value)
		}
		else {
			setMatch(0)
		}
	},[props.match])
	
	function updateMatch(value:number) {
		props.updateMatch(value)
	}
	
	useEffect(() => {
		if(audioNode) {
			audioNode.buffer = audioBuffer
			audioNode.connect(audioGainNode)
			if(!audioPlaying) {
				audioNode.start(0, playRange[0])
				setAudioPlaying(true)
			}
		}
	},[audioNode])
	
	useEffect(() => {
		if(tempOsc) {
			tempOsc.connect(oscGainNode)
			tempOsc.type = 'sine'
			tempOsc.frequency.setValueAtTime(lib.calcFrequency(tempNote, octave), audioCtx.currentTime)
			tempOsc.start()
		}
	},[tempOsc])
	
	useEffect(() => {
		if(props.track && props.track.file) {
			if(audioNode) {
				audioStop()
			}
			setAudioLoading(true)
			setActiveNotes(props.track.keys)
			if(props.match) {
				setMatch(props.match.value)
			}
			else {
				setMatch(0)
			}
			props.propagateMatches()
			window.api.send(com.read_mp3 +props.loadChannel, props.track.file)
		}
	}, [props.track])

	useEffect(() => {
		if(tempNote) {
			setTempOsc(audioCtx.createOscillator())
		}
		else {
			if(tempOsc) {
				tempOsc.stop()
				tempOsc.disconnect()
			}
		}
	}, [tempNote])

	useEffect(() => {
		audioGainNode.gain.setValueAtTime(audioGain /100, 0)
	},[audioGain])

	useEffect(() => {
		if(playRange[0] >0) {
			if(audioNode) {
				audioStop()
			}
			if(!audioLoading) {
				audioPlay()
			}
		}
	},[playRange])

	useEffect(() => {
		oscGainNode.gain.setValueAtTime(oscGain /100, 0)
	},[oscGain])

	const mp3Red = (data:ArrayBuffer) => {
		if(audioNode) {
			audioNode.disconnect()
		}
		audioCtx.decodeAudioData(data).then((buffer) => {
			setAudioBuffer(buffer)
			const length = +(buffer.duration.toPrecision(2))
			setAudioLength(length)
			setPlayRange([playRange[0], length])
			setAudioLoading(false)
		}).catch((err) => {
			console.log("Error with decoding audio data" + err.message)
		})
	}

	const audioToggle = () => {
		if(!audioLoading)
			if(audioPlaying) {
				audioStop()
			}
			else {
				audioPlay()
			}
	}

	function audioPlay() {
		setAudioNode(audioCtx.createBufferSource())
	}

	function audioStop() {
		if(audioPlaying) {
			audioNode.stop(audioCtx.currentTime)
			setAudioPlaying(false)
			audioNode.disconnect()
		}
	}

	function oscPlay() {
		setOscPlaying(true)
		activeNotes.forEach((note:number) => {
			const osc = audioCtx.createOscillator()
			oscs.push(osc)
			osc.type = 'sine'
			osc.frequency.setValueAtTime(lib.calcFrequency(note, octave), audioCtx.currentTime)
			osc.connect(oscGainNode)
			osc.start()
		})
	}

	function oscStop() {
		oscs.forEach(osc => {
			osc.stop(audioCtx.currentTime)
			osc.disconnect()
		})
		setOscPlaying(false)
	}

	const oscToggle = () => {
		if(oscPlaying) {
			oscStop()
		}
		else {
			oscPlay()
		}
	}

	return (
			<div>
				<div style={{display: 'flex', justifyContent: 'stretch', ...padder}}>
					<div style={{paddingLeft:10, paddingRight:10, flexGrow:10}}>
						<RangeSlider min={0} max={audioLength} value={playRange} labelStepSize={30}
										onChange={(value) => setPlayRange(value)} />
					</div>
					<div style={{paddingLeft:10, paddingRight:20}}>
						<Slider value={audioGain} min={0} max={100} labelStepSize={10}
								onChange={(value) => setAudioGain(value)}
						/>
					</div>
					<Button icon={audioLoading ? <Spinner size={15} /> : audioPlaying ? 'pause' :'play'}
							onClick={audioToggle} style={{width:50}} />
				</div>
				<Divider/>
				<div style={{...padder, display: 'flex', justifyContent:'space-between'}}>
					
					<Keys activeNotes={activeNotes} updateActiveNotes={(notes:[]) => setActiveNotes(notes)}
							updateTempNote={(n:number) => setTempNote(n)} />
					
					<div style={{display: 'flex', justifyContent:'stretch'}}>
						<div style={{paddingLeft:10, paddingRight:20}}>
							<Slider value={oscGain} min={0} max={100} labelStepSize={10}
									onChange={(value) => setOscGain(value)}
							/>
							<Slider value={octave} min={0} max={8} labelStepSize={1}
									onChange={(value) => setOctave(value)}
							/>
						</div>
						<div style={{display:'flex', flexDirection:'column'}}>
							<Button icon={oscPlaying ? 'pause' :'play'}
									  onClick={oscToggle} style={{width:50, height:'100%'}} />
							<div style={{height:20}} />
							<HTMLSelect value={match} onChange={(event: any):void => updateMatch(event.target.value)}
											style={{width:50, height:35}} disabled={!props.opposingLoaded}
							>
								<option>1.0</option>
								<option>0.9</option>
								<option>0.8</option>
								<option>0.7</option>
								<option>0.6</option>
								<option>0.5</option>
								<option>0.4</option>
								<option>0.3</option>
								<option>0.2</option>
								<option>0.1</option>
								<option>0</option>
							</HTMLSelect>
						</div>
					</div>
				</div>
			</div>
	)
}