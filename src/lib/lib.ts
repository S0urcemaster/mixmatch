import Track from '../data/Track'
import com from '../main/processcom'

declare const window: any


const fNoteC = 16.35

export function calcFrequency(interval:number, octave:number):number {
	return fNoteC * ((2 ** (1 / 12)) ** (interval + octave * 12))
}

export function saveCollection(tracks:Track[]):void {
	console.log('save C', tracks)
	window.api.send(com.save_collection, tracks)
}

export function fromNml(data:string):Track[] {
	const parser = new DOMParser()
	const doc = parser.parseFromString(data, "application/xml");
	const entries = doc.getElementsByTagName('COLLECTION').item(0).getElementsByTagName('ENTRY')
	const trax = []
	for(let i = 0; i< entries.length; i++) {
		const entry = entries.item(i)
		const track = new Track();
		track.modified_date = entry.getAttribute('MODIFIED_DATE')
		track.modified_time = entry.getAttribute('MODIFIED_TIME')
		track.title = entry.getAttribute('TITLE')
		track.artist = entry.getAttribute('ARTIST')
		const location = entry.getElementsByTagName('LOCATION').item(0)
		track.dir = location.getAttribute('DIR')
		track.volume = location.getAttribute('VOLUME')
		track.file = track.volume +track.dir.split(':').join('') +location.getAttribute('FILE')
		track.volumeid = location.getAttribute('VOLUMEID')
		const info = entry.getElementsByTagName('INFO').item(0)
		track.bitrate = info.getAttribute('BITRATE')
		track.genre = info.getAttribute('GENRE')
		track.key = info.getAttribute('KEY')
		track.playcount = info.getAttribute('PLAYCOUNT')
		track.playtime = info.getAttribute('PLAYTIME')
		track.playtime_float = info.getAttribute('PLAYTIME_FLOAT')
		track.import_date = info.getAttribute('IMPORT_DATE')
		track.last_played = info.getAttribute('LAST_PLAYED')
		track.flags = info.getAttribute('FLAGS')
		const tempo = entry.getElementsByTagName('TEMPO').item(0)
		track.bpm = tempo.getAttribute('BPM')
		track.bpm_quality = tempo.getAttribute('BPM_QUALITY')
		const loudness = entry.getElementsByTagName('LOUDNESS').item(0)
		track.peak_db = loudness.getAttribute('PEAK_DB')
		track.perceived_db = loudness.getAttribute('PERCEIVED_DB')
		track.analyzed_db = loudness.getAttribute('ANALYZED_DB')
		const musicalKey = entry.getElementsByTagName('MUSICAL_KEY').item(0)
		track.musical_key = musicalKey.getAttribute('VALUE')
		trax.push(track)
	}
	return trax
}