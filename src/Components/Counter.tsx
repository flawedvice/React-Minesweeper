
interface CounterProps {
    bombsLeft:  number
    time: number
}
const Counter = (props: CounterProps) => {
    return (
        <h1>Counter</h1>
    );
};

export default Counter;