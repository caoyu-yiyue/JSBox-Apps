const api = require("./scripts/api");
const widget = require("./scripts/widget");

const inputMid = $widget.inputValue;
const lastVideoStats = await api.reloadData(inputMid);
//const lastVideoStats = await api.reloadData("8047632");

widget.init(lastVideoStats);

