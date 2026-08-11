import "./ProcessStep.css";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <li className="process-step">
      <span className="process-step__number" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}
