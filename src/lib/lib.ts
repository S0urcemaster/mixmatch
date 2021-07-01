import Track from '../data/Track'
import com from '../main/processcom'
import Match from '../data/Match'

declare const window: any

export function findMatch(matches:Match[], title:string):Match|undefined {
	console.log('lib',matches, title)
	return matches.find((match:Match) => match.title === title)
}

export function findByTitle(collection:Track[], title:string):Track|undefined {
	return collection.find((track:Track) => track.title === title)
}

export function noteFromMusicalKey(key:number) {
	return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
		'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm', ][key]
}

export function translateKey(openKey:string):string {
	const open = ['1m',   '2m',   '3m',   '4m',    '5m',    '6m',    '7m',    '8m',    '9m',   '10m',  '11m',  '12m',
		'1d',   '2d',   '3d',   '4d',   '5d',   '6d',   '7d',    '8d',    '9d',    '10d',   '11d',   '12d']
	const chor = ['Amin', 'Emin', 'Bmin', 'F#min', 'C#min', 'G#min', 'D#min', 'A#min', 'Fmin', 'Cmin', 'Gmin', 'Dmin',
		'Cmaj', 'Gmaj', 'Dmaj', 'Amaj', 'Emaj', 'Bmaj', 'F#maj', 'C#maj', 'G#maj', 'D#maj', 'A#maj', 'Fmaj']
	return chor[open.indexOf(openKey)]
}

export function getKeyName(num:number) {
	switch(num) {
		case 0: return 'C'; 
		case 1: return 'C#'; 
		case 2: return 'D'; 
		case 3: return 'D#'; 
		case 4: return 'E'; 
		case 5: return 'F'; 
		case 6: return 'F#'; 
		case 7: return 'G'; 
		case 8: return 'G#'; 
		case 9: return 'A'; 
		case 10: return 'A#'; 
		case 11: return 'B'; 
		case 12: return 'C'; 
		case 13: return 'C#'; 
		case 14: return 'D'; 
		case 15: return 'D#'; 
		case 16: return 'E'; 
		case 17: return 'F'; 
		case 18: return 'F#'; 
		case 19: return 'G'; 
		case 20: return 'G#'; 
		case 21: return 'A'; 
		case 22: return 'A#'; 
		case 23: return 'B'; 
	}
}

const fNoteC = 16.35

export function calcFrequency(interval:number, octave:number):number {
	return fNoteC * ((2 ** (1 / 12)) ** (interval + octave * 12))
}

export function saveCollection(tracks:Track[]):void {
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
		if(location) {
			track.dir = location.getAttribute('DIR')
			track.volume = location.getAttribute('VOLUME')
			track.file = track.volume +track.dir.split(':').join('') +location.getAttribute('FILE')
			track.volumeid = location.getAttribute('VOLUMEID')
		}
		const album = entry.getElementsByTagName('ALBUM').item(0)
		if(album) {
			track.album = album.getAttribute('TITLE')
			track.album_track = album.getAttribute('TRACK')
		}
		const info = entry.getElementsByTagName('INFO').item(0)
		if(info) {
		
		}
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
		if(info) {
			track.bpm = tempo.getAttribute('BPM')
			track.bpm_quality = tempo.getAttribute('BPM_QUALITY')
		}
		const loudness = entry.getElementsByTagName('LOUDNESS').item(0)
		if(info) {
			track.peak_db = loudness.getAttribute('PEAK_DB')
			track.perceived_db = loudness.getAttribute('PERCEIVED_DB')
			track.analyzed_db = loudness.getAttribute('ANALYZED_DB')
		}
		const musicalKey = entry.getElementsByTagName('MUSICAL_KEY').item(0)
		if(info) {
			track.musical_key = musicalKey.getAttribute('VALUE')
		}
		trax.push(track)
	}
	return trax
}