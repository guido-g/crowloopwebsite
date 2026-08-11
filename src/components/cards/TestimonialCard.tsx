import "./TestimonialCard.css";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <figure className="testimonial-card">
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        <span className="testimonial-card__name">{name}</span>
        <span className="testimonial-card__role">{role}</span>
      </figcaption>
    </figure>
  );
}
