import { useState } from "react";

export function Counter() {
    const [count, setCount] = useState<number>(0);

    return <button data-testid="counter" onClick={() => setCount((prev) => ++prev)}>{`count:${count}`}</button>
}
