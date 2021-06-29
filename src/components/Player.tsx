import React, {PropsWithChildren, useState, useEffect} from 'react';

import { Divider, Button, Slider, RangeSlider, NumberRange, Spinner, Colors } from "@blueprintjs/core";

import styles, {css} from '../styles'
import Track from "../data/Track"
import com from "../main/processcom";
import Keys from "../components/Keys";

declare const window: any;

const padder: css = {
	padding: 5,
}

const audioCtx = new AudioContext();
let audioBuffer:AudioBuffer = null
let audioNode:AudioBufferSourceNode = null
const audioGainNode = audioCtx.createGain()
audioGainNode.gain.value = 1

const oscGainNode = audioCtx.createGain()
oscGainNode.gain.value = 1

const oscs:OscillatorNode[] = []

export default function (props: PropsWithChildren<any> & {
	track:Track, audioCtx:AudioContext
}) {

	useEffect(() => {
		window.api.receive(com.read_mp3, (data:any) => mp3Red(data.pop()))
	},[])

	const [audioGain, setAudioGain] = useState(100)
	const [audioLength, setAudioLength] = useState(300)
	const [playRange, setPlayRange] = useState([0, audioLength] as NumberRange)
	const [audioPlaying, setAudioPlaying] = useState(false)
	const [audioLoading, setAudioLoading] = useState(false)
	const [oscPlaying, setOscPlaying] = useState(false)
	const [oscGain, setOscGain] = useState(100)
	const [octave, setOctave] = useState(4)
	const [oscFreqs, setOscFreqs] = useState([])

	useEffect(() => {
		if(props.track && props.track.title) {
			setAudioLoading(true)
			audioStop()
			setAudioLoading(true)
			window.api.send(com.read_mp3, props.track.file)
		}
	}, [props.track])

	useEffect(() => {
		audioGainNode.gain.setValueAtTime(audioGain /100, 0)
	},[audioGain])

	useEffect(() => {
		audioStop()
		if(!audioLoading) audioPlay(playRange[0])
	},[playRange])

	useEffect(() => {
		oscGainNode.gain.setValueAtTime(oscGain /100, 0)
	},[oscGain])

	const mp3Red = (data:ArrayBuffer) => {
		if(audioNode) {
			audioNode.disconnect()
		}
		console.log(data)
		audioCtx.decodeAudioData(data).then((buffer) => {
			audioBuffer = buffer
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
				audioPlay(playRange[0])
			}
	}

	function audioPlay(seconds:number) {
		setAudioPlaying(true)
		audioNode = audioCtx.createBufferSource()
		audioNode.buffer = audioBuffer
		audioNode.connect(audioGainNode)
		audioGainNode.connect(audioCtx.destination)
		audioNode.start(0, seconds)
	}

	function audioStop() {
		setAudioPlaying(false)
		if(audioNode) {
			audioNode.stop(audioCtx.currentTime)
			audioNode.disconnect()
		}
	}

	function oscPlay() {
		setOscPlaying(true)
		console.log('freqs', oscFreqs)
		oscFreqs.forEach((freq:number) => {
			const osc = audioCtx.createOscillator()
			oscs.push(osc)
			osc.type = 'sine'
			osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
			osc.connect(oscGainNode)
			oscGainNode.connect(audioCtx.destination)
			osc.start()
		})
	}

	function oscStop() {
		setOscPlaying(false)
		oscs.forEach(osc => {
			osc.stop(audioCtx.currentTime)
			osc.disconnect()
		})
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
					<Keys octave={octave} activeFrequencies={(fs:[]) => setOscFreqs(fs)} />
					<div style={{display: 'flex', justifyContent:'space-between'}}>
						<div style={{paddingLeft:10, paddingRight:20}}>
							<Slider value={oscGain} min={0} max={100} labelStepSize={10}
									onChange={(value) => setOscGain(value)}
							/>
							<Slider value={octave} min={0} max={8} labelStepSize={1}
									onChange={(value) => setOctave(value)}
							/>
						</div>
						<Button icon={oscPlaying ? 'pause' :'play'}
								onClick={oscToggle} style={{width:50}} />
					</div>
				</div>
			</div>
	)
}