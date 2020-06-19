import React, { useState } from 'react';
import {Divider, Box, useTheme, Heading, Stack} from '@chakra-ui/core';
import DataInput from './DataInput';
import Switch from './Switch';
import CenterFlex from './CenterFlex';
const Calculator = () => {
	const theme = useTheme();
	const [selectedChoice, setSelectedChoice] = useState<string | number | undefined>(0);
	console.log(selectedChoice);
	return <>
		<Heading m="10px" color={theme.colors.red[400]} size="2xl" fontSize="10vmin" textAlign="center">
			Calculator
		</Heading>
		<Stack isInline w="100%" paddingX="30px" boxSizing="border-box" display="flex" justifyContent="center">
			<CenterFlex m="10px 0px">
				<Switch choices={['Pace', 'Speed']} value={selectedChoice} onChange={val => setSelectedChoice(val)} />
			</CenterFlex>
			<CenterFlex flex="1">
				{
				selectedChoice === 0 ?
				<Stack isInline={true} m="10px 0px" w="100%">
					<DataInput index={0} placeholder="Pace" numberOnly={true} unit="min" />
					<DataInput index={2} placeholder="Pace" numberOnly={true} unit="sec" />
				</Stack> :
				<Box m="10px 0px" w="100%">
					<DataInput index={1} bg={theme.colors.teal[200]} placeholder="Speed" unit="kmph" />
				</Box>
				}
			</CenterFlex>
		</Stack>
		<Box m="10px 30px">
			<DataInput index={3} bg={theme.colors.green[200]} placeholder="Distance" unit="m" />
		</Box>
		<Divider />
		<Box m="10px 30px">
			<DataInput index={4} bg={theme.colors.purple[200]} placeholder="Time" unit="min"/>
		</Box>
	</>;
}
export default Calculator;