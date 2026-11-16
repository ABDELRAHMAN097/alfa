
export default function AlfaLogo({ className = "h-12" }) {
  return (
    <img
      src="/logo.png"
      alt="Alfa Care"
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}
