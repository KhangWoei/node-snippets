interface LabelProps {
    color: string;
    value: string
}

export function Label({ color, value }: LabelProps) {
    return <div style={{ color }}>{value}</div>
}
