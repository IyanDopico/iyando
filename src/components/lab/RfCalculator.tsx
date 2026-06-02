import { useMemo, useState } from "react";

const clampNumber = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);

export default function RfCalculator() {
  const [frequency, setFrequency] = useState(2400);
  const [distance, setDistance] = useState(1.2);
  const [txPower, setTxPower] = useState(20);
  const [txGain, setTxGain] = useState(5);
  const [rxGain, setRxGain] = useState(5);
  const [extraLoss, setExtraLoss] = useState(8);
  const [sensitivity, setSensitivity] = useState(-90);

  const result = useMemo(() => {
    const safeFrequency = Math.max(1, clampNumber(frequency, 2400));
    const safeDistance = Math.max(0.001, clampNumber(distance, 1));
    const fspl = 32.44 + 20 * Math.log10(safeFrequency) + 20 * Math.log10(safeDistance);
    const rxPower = txPower + txGain + rxGain - fspl - extraLoss;
    const margin = rxPower - sensitivity;

    return {
      fspl,
      rxPower,
      margin,
    };
  }, [distance, extraLoss, frequency, rxGain, sensitivity, txGain, txPower]);

  return (
    <div className="demo-split rf-demo">
      <div className="control-panel">
        <NumberControl label="Frecuencia" suffix="MHz" value={frequency} onChange={setFrequency} />
        <NumberControl label="Distancia" suffix="km" value={distance} onChange={setDistance} />
        <NumberControl label="Potencia TX" suffix="dBm" value={txPower} onChange={setTxPower} />
        <NumberControl label="Ganancia TX" suffix="dBi" value={txGain} onChange={setTxGain} />
        <NumberControl label="Ganancia RX" suffix="dBi" value={rxGain} onChange={setRxGain} />
        <NumberControl label="Pérdidas extra" suffix="dB" value={extraLoss} onChange={setExtraLoss} />
        <NumberControl label="Sensibilidad" suffix="dBm" value={sensitivity} onChange={setSensitivity} />
      </div>

      <div className="rf-result" aria-live="polite">
        <p className="panel-label">Resultado</p>
        <div className="rx-value">
          {result.rxPower.toFixed(2)}
          <span>dBm</span>
        </div>
        <dl>
          <div>
            <dt>FSPL</dt>
            <dd>{result.fspl.toFixed(2)} dB</dd>
          </div>
          <div>
            <dt>Margen</dt>
            <dd className={result.margin >= 10 ? "is-good" : result.margin >= 0 ? "is-warning" : "is-bad"}>
              {result.margin.toFixed(2)} dB
            </dd>
          </div>
        </dl>
        <p className="formula">Pᵣ = Pₜ + Gₜ + Gᵣ - Lfs - Lextra</p>
      </div>
    </div>
  );
}

interface NumberControlProps {
  label: string;
  onChange: (value: number) => void;
  suffix: string;
  value: number;
}

function NumberControl({ label, onChange, suffix, value }: NumberControlProps) {
  return (
    <label className="number-control">
      <span>{label}</span>
      <span className="input-shell">
        <input onChange={(event) => onChange(Number(event.target.value))} type="number" value={value} />
        <em>{suffix}</em>
      </span>
    </label>
  );
}
