import React, {PropsWithChildren, useState, useEffect} from 'react';

import { Divider, Button, Slider, RangeSlider, NumberRange, Spinner } from "@blueprintjs/core";

import styles, {css} from '../styles'
import GenreSelect from "../components/GenreSelect";
import NoteSelect from "../components/NoteSelect";
import {notes} from "../data/Note";
import Track from "../data/Track"
import com from "../main/processcom";

declare const window: any;

const padder: css = {
	padding: 5,
}

const audioCtx = new AudioContext();
let audioBuffer:AudioBuffer = null
let audioNode:AudioBufferSourceNode = null
const gainNode = audioCtx.createGain();
gainNode.gain.value = 0.5;

export default function (props: PropsWithChildren<any> & {
	track:Track, audioCtx:AudioContext
}) {

	useEffect(() => {
		window.api.receive(com.read_mp3, (data:any) => mp3Red(data.pop()))
	},[])

	const [audioGain, setAudioGain] = useState(100)
	const [audioLength, setAudioLength] = useState(300)
	const [playRange, setPlayRange] = useState([0, audioLength] as NumberRange)
	const [playing, setPlaying] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if(props.track && props.track.title) {
			setLoading(true)
			audioStop()
			setLoading(true)
			window.api.send(com.read_mp3, props.track.file)
		}
	}, [props.track])

	useEffect(() => {
		gainNode.gain.setValueAtTime(audioGain /100, 0)
	},[audioGain])

	useEffect(() => {
		audioStop()
		audioPlay(playRange[0])
	},[playRange])

	const mp3Red = (data:ArrayBuffer) => {
		if(audioNode) {
			audioNode.disconnect()
		}
		console.log(data)
		audioCtx.decodeAudioData(data).then((buffer) => {
			audioBuffer = buffer
			console.log(buffer)
			setLoading(false)
			const length = +(buffer.duration.toPrecision(2))
			setAudioLength(length)
			setPlayRange([playRange[0], length])
			// if(buffer) {
			// 	setAudioLength(+(props.buffer.duration.toPrecision(2)))
			// }
		}).catch((err) => {
			console.log("Error with decoding audio data" + err.message)
		})
	}

	const audioToggle = () => {
		if(!loading)
			if(playing) {
				audioStop()
			}
			else {
				audioPlay(0)
			}
	}

	function audioPlay(seconds:number) {
		setPlaying(true)
		audioNode = audioCtx.createBufferSource()
		audioNode.buffer = audioBuffer
		audioNode.connect(gainNode)
		gainNode.connect(audioCtx.destination)
		audioNode.start(0, seconds)
	}

	function audioStop() {
		setPlaying(false)
		if(audioNode) {
			audioNode.stop(audioCtx.currentTime)
			audioNode.disconnect()
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
					<Button icon={loading ? <Spinner size={15} /> : playing ? 'pause' :'play'}
							onClick={audioToggle} style={{width:50}} />
				</div>
				<Divider/>
				<div style={{display: 'flex', justifyContent: 'space-between', ...padder}}>
					<div>
						<NoteSelect initialNote={notes[0]}/>
						<NoteSelect initialNote={notes[4]}/>
						<NoteSelect initialNote={notes[7]}/>
						<NoteSelect initialNote={null}/>
						<NoteSelect initialNote={null}/>
					</div>
					<Button icon='play'/>
				</div>
			</div>
	)
}