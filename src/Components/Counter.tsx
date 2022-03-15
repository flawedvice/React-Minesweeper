
interface CounterProps {
    bombsLeft:  number
    time: number
}
const Counter = (props: CounterProps) => {
    return (
        <section id="counter-bar">
            <h2>💣: {props.bombsLeft}</h2>
            <button id="reset-btn">Reset</button>
            <h2>⏱️: {props.time}</h2>
        </section>
    );
};

export default Counter;