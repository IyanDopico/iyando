import { useMemo, useState } from "react";

const pointCount = 180;

const buildSignalPath = (amplitude: number, frequency: number, phase: number, noise: number) => {
  const points = Array.from({ length: pointCount }, (_, index) => {
    const t = index / (pointCount - 1);
    const base = amplitude * Math.sin(2 * Math.PI * frequency * t + (phase * Math.PI) / 180);
    const noiseWave =
      noise *
      (0.6 * Math.sin(2 * Math.PI * 17 * t + 0.4) + 0.4 * Math.sin(2 * Math.PI * 31 * t + 1.7));
    const value = base + noiseWave;
    return {
      x: 20 + t * 420,
      y: 120 - value * 42,
    };
  });

  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
};

export default function SignalVisualizer() {
  const [amplitude, setAmplitude] = useState(1.2);
  const [frequency, setFrequency] = useState(3);
  const [phase, setPhase] = useState(35);
  const [noise, setNoise] = useState(0.25);

  const path = useMemo(
    () => buildSignalPath(amplitude, frequency, phase, noise),
    [amplitude, frequency, phase, noise],
  );

  return (
    <div className="demo-split signal-demo">
      <div className="oscilloscope" aria-label="Visualización de señal">
        <svg viewBox="0 0 460 240" role="img" aria-label="Forma de onda generada con los parámetros seleccionados">
          <defs>
            <pattern id="grid" width="46" height="24" patternUnits="userSpaceOnUse">
              <path d="M 46 0 L 0 0 0 24" fill="none" stroke="rgba(130, 220, 214, 0.18)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="460" height="240" rx="12" fill="#081923" />
          <rect x="12" y="12" width="436" height="216" rx="10" fill="url(#grid)" />
          <path d="M 20 120 L 440 120" stroke="rgba(255,255,255,0.18)" strokeDasharray="5 7" />
          <path d={path} fill="none" stroke="#27d3c3" strokeLinecap="round" strokeWidth="3" />
        </svg>
      </div>

      <div className="control-panel">
        <RangeControl label="Amplitud" max={2} min={0.2} step={0.1} unit="V" value={amplitude} onChange={setAmplitude} />
        <RangeControl label="Frecuencia" max={8} min={1} step={0.5} unit="Hz" value={frequency} onChange={setFrequency} />
        <RangeControl label="Fase" max={180} min={-180} step={5} unit="°" value={phase} onChange={setPhase} />
        <RangeControl label="Ruido" max={1} min={0} step={0.05} unit="u." value={noise} onChange={setNoise} />
      </div>
    </div>
  );
}

interface RangeControlProps {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  unit: string;
  value: number;
}

function RangeControl({ label, max, min, onChange, step, unit, value }: RangeControlProps) {
  return (
    <label className="range-control">
      <span>
        {label}
        <strong>
          {value.toFixed(step < 1 ? 2 : 0)} {unit}
        </strong>
      </span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
