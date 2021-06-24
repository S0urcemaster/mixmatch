import React, {PropsWithChildren} from 'react';

import { Card, Divider, Button } from "@blueprintjs/core";

import { notes } from '../data/Note'
import styles, {css} from '../styles'

import '../App.css'

const padder:css = {
	padding:5,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props: PropsWithChildren<any>) {

	return (
			<Card style={{...props.style, padding:0, width:'100%'}}>
				<div style={{...padder, display:'flex', flexWrap:'wrap', gap:'10px'}}>
					<Button>Filter</Button>
					<Button>Sort</Button>
					<Divider style={{margin: 0}}/>
					<Button>Action 2</Button>
					<Button>Action 3</Button>
					<Button>Action 4</Button>
				</div>
			</Card>
	)
}