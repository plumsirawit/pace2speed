import React from 'react';
import {Divider, Box, useTheme} from '@chakra-ui/core';
import DataInput from './DataInput';
const Calculator = () => {
	const theme = useTheme();
	return <>
		<Box m="10px 30px">
			
		</Box>
		<Divider />
		<Box m="10px 30px">
			<DataInput index={3} bg={theme.colors.teal[200]} placeholder="Distance" unit="m" />
		</Box>
	</>;
}
export default Calculator;