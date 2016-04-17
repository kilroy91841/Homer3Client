export function getTradeElementText(obj) {
	if (obj.player) {
		return obj.player.name;
	} else if (obj.minorLeaguePick) {
		var text = obj.minorLeaguePick.text;
		if (obj.swapTrade) {
			text += " (Swap)";
		}
		return text;
	} else if (obj.draftDollar) {
		return "$" + obj.draftDollarAmount + " of " + obj.draftDollar.text;
	} else {
		return "";
	}
};