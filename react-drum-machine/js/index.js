function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class DrumMachine extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "playBeat",

    key => {/*yet again rewriting to make tests work*/
      /*let beat = new Audio(this.beats[key]);
      beat.play();*/
      let beat = document.getElementById(key);
      beat.volume = this.state.volume;
      beat.play();
    });_defineProperty(this, "handleKeyDown",

    e => {
      if (this.keys.hasOwnProperty(e.keyCode)) {
        this.playBeat(this.keys[e.keyCode]);
        let buttonStyle = { ...this.state.buttonStyle };
        buttonStyle[this.keys[e.keyCode]] = {
          transform: "translate(0px, 3px)",
          boxShadow: "none",
          outline: "none" };

        this.setState({
          button: this.keys[e.keyCode],
          buttonStyle });

      }
    });_defineProperty(this, "handleKeyUp",

    e => {
      if (this.keys.hasOwnProperty(e.keyCode)) {
        let buttonStyle = { ...this.state.buttonStyle };
        buttonStyle[this.keys[e.keyCode]] = {};
        this.setState({ buttonStyle });
      }
    });_defineProperty(this, "handleClick",

    e => {
      this.playBeat(e.target.id[0]);
      this.setState({
        button: e.target.id[0] /*[0] stuff to make the tests work*/ });

    });_defineProperty(this, "handleSlider",

    e => {
      this.setState({
        volume: e.target.value });

    });this.state = { button: "", buttonStyle: { "Q": {}, "W": {}, "E": {}, "A": {}, "S": {}, "D": {}, "Z": {}, "X": {}, "C": {} }, volume: 0.5 };this.lines = { "Q": "Heater-1", "W": "Heater-2", "E": "Heater-3", "A": "Heater-4", "S": "Clap", "D": "Open-HH", "Z": "Kick-n'-Hat", "X": "Kick", "C": "Closed-HH" };this.keys = { 81: "Q", 87: "W", 69: "E", 65: "A", 83: "S", 68: "D", 90: "Z", 88: "X", 67: "C" };this.beats = { Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" };}componentDidMount() {document.addEventListener('keydown', this.handleKeyDown);document.addEventListener('keyup', this.handleKeyUp);}componentWillUnmount() {document.removeEventListener('keydown', this.handleKeyDown);document.removeEventListener('keyup', this.handleKeyUp);}

  render() {/*had to add the ugly unnesesary audio element to make the tests work*/
    const buttons = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].map(
    i => React.createElement("button", { id: i + "1", onClick: this.handleClick, style: this.state.buttonStyle[i], className: "drum-pad", key: i }, React.createElement("audio", { className: "clip", id: i, src: this.beats[i] }), i));

    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "drum-pad-box" },
      buttons),

      React.createElement("div", { id: "control-box" },
      React.createElement("h1", null, "Drum Machine"),
      React.createElement("div", { id: "display" }, this.lines[this.state.button]),
      React.createElement("div", { id: "volume-box" },
      React.createElement("div", { id: "volume-ticks" }),
      React.createElement("input", { id: "volume-slider", type: "range", min: "0", max: "1", step: "0.01", value: this.state.volume, onChange: this.handleSlider }),
      React.createElement("label", { id: "volume-label" }, "Volume")))));

  }}
;

ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("root"));