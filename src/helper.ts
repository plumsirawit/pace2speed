export const checkValidNumberText = (text: string) =>  text.length > 0 && text.charAt(text.length-1) !== '.' && !isNaN(Number(text));
export const formatNumber = (num : number) => {
	const ret = Math.round(num * 100) / 100;
	if(isNaN(ret)) return '';
	else return ret.toString();
}